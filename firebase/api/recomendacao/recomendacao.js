import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import getUserID from '../user/getUserID';
import { formatDate } from '../../../utils/formatDate';

const removerCaracteresNaoAlfanumericos = (texto) => {
    // Esta expressão regular irá corresponder a qualquer coisa que não seja letras, números ou espaços
    const regex = /[^a-zA-Z0-9áéíóúâêîôûãõàèìòùäëïöüçÁÉÍÓÚÂÊÎÔÛÃÕÀÈÌÒÙÄËÏÖÜÇ\s]/g;
    return texto.replace(regex, ' ');
    };
    const contarPalavras = (texto) => {
        // Remove os caracteres não alfanuméricos e depois divide a string em palavras
        const palavras = removerCaracteresNaoAlfanumericos(texto).split(/\s+/);
        return palavras.filter(Boolean).length; // Filtra espaços vazios que podem ser contados como palavras
    };

    export default function recomendarProjeto(idUsuario, idProjeto) {
        // Vamos usar uma função assíncrona para lidar com as operações assíncronas do Firestore.
        const realizarRecomendacao = async () => {
            try {
            // Referências aos documentos e coleções
                const caminhoUsuario = `usuarios/${idUsuario}`;
                const caminhoProjeto = `projetos/${idProjeto}`;
                const docRefTime = firestore().doc(`${caminhoUsuario}/interacao_projetos/${idProjeto}`);
        
                // Obtendo dados do Firestore
                const docTimeSnapshot = await docRefTime.get();
                const docTime = docTimeSnapshot.data();
        
                const colecaoUsuarios = firestore().collection('usuarios');
                const colecaoProjetos = firestore().collection('projetos');
        
                const docUsuarioSnapshot = await colecaoUsuarios.doc(idUsuario).get();
                const dadosUsuario = docUsuarioSnapshot.data();
        
                const docProjetoSnapshot = await colecaoProjetos.doc(idProjeto).get();
                const dadosProjeto = docProjetoSnapshot.data();
        
                // Exemplo de uso dentro da função assíncrona
                const cadastradoPor = dadosProjeto['cadastradorPor'] ?? '';
                const categoria = dadosProjeto['categoria'] ?? '';
                const dtCriacao = String(dadosProjeto['dt_criacao']) ?? '';
                const nomeProjeto = dadosProjeto['nome_projeto'] ?? '';
                const descricao = dadosProjeto['descricao'] ?? '';
                
                const contagemPalavrasCadastro = contarPalavras(cadastradoPor);
                const contagemPalavrasCategoria = contarPalavras(categoria);
                const contagemPalavrasDtCriacao = contarPalavras(dtCriacao);
                const contagemPalavrasNomeProjeto = contarPalavras(nomeProjeto);
                const contagemPalavrasDescricao = contarPalavras(descricao);
                
                const tempoGastoTotal = Math.floor((contagemPalavrasNomeProjeto + contagemPalavrasDescricao + contagemPalavrasCadastro + contagemPalavrasCategoria + contagemPalavrasDtCriacao) / 238);

            const dtEntrada = docTime['dt_entrada'].toDate(); // Supondo que seja um Timestamp do Firebase
            const entrada = formatDate(dtEntrada); // Usando sua função personalizada

            const dtSaida = docTime['dt_saida'].toDate(); // Supondo que seja um Timestamp do Firebase
            const saida = formatDate(dtSaida); // Usando sua função personalizada

            const diferencaSegundos = (dtSaida.getTime() - dtEntrada.getTime()) / 1000; // Convertendo milissegundos em segundos

            // Agora você pode usar diferencaSegundos para calcular a janela de tempo
            const janelaSuperior = tempoGastoTotal + 2;
            const janelaInferior = tempoGastoTotal - 2;

            let recomendacao;
            if (diferencaSegundos > janelaSuperior) {
                recomendacao = "recomendar";
            } else if (diferencaSegundos < janelaInferior) {
                recomendacao = "não recomendar";
            } else {
                recomendacao = "neutro";
            }

                const ambiental = dadosUsuario['Ambiental'] ?? 0;
                const educacional = dadosUsuario['Educacional'] ?? 0;
                const saude = dadosUsuario['Saude'] ?? 0;
                const social = dadosUsuario['Social'] ?? 0;

                const valorCategoria = dadosUsuario[categoria] ?? 0;

                const totalIndiv = 21;
                const totalGlobal = ambiental + educacional + saude + social;
                // Log do total global para depuração, se necessário
                const docRefUsuario = firestore().doc(caminhoUsuario);

                const atualizarCategoria = async (categoriaIncremento, outrasCategoriasDecrementos) => {
                    try {
                        await firestore().runTransaction(async (transaction) => {
                        transaction.update(docRefUsuario, { [categoria]: firestore.FieldValue.increment(categoriaIncremento) });
            
                        outrasCategoriasDecrementos.forEach((decCategoria) => {
                            if (dadosUsuario[decCategoria] > 1) {
                            transaction.update(docRefUsuario, { [decCategoria]: firestore.FieldValue.increment(-1) });
                            }
                        });
                        });
                    } catch (error) {
                        console.error('Erro ao atualizar categorias: ', error);
                    }
                    };
            
                    if (recomendacao === "recomendar") {
                    const incremento = valorCategoria !== totalIndiv ? 1 : 0;
                    const decrementoCategorias = ['Ambiental', 'Educacional', 'Saude', 'Social'].filter(cat => cat !== categoria);
                    await atualizarCategoria(incremento, decrementoCategorias);
                    } else if (recomendacao === "não recomendar") {
                    if (valorCategoria > 1) {
                        await docRefUsuario.update({ [categoria]: firestore.FieldValue.increment(-1) });
                    }
                    }
                
                    if ((ambiental > 10 && saude > 10) ||
                        (ambiental > 10 && social > 10) ||
                        (ambiental > 10 && educacional > 10) ||
                        (saude > 10 && social > 10) ||
                        (saude > 10 && educacional > 10) ||
                        (social > 10 && educacional > 10)) {
                        
                        const docRef = firestore().doc(`usuarios/${idUsuario}`);
                        
                        try {
                            const docSnapshot = await docRef.get();
                            const dadosUsuario = docSnapshot.data();
                            const ambiental = dadosUsuario['Ambiental'];
                            const educacional = dadosUsuario['Educacional'];
                            const saude = dadosUsuario['Saude'];
                            const social = dadosUsuario['Social'];
                        
                            const valores = {
                                'Ambiental': ambiental,
                                'Educação': educacional,
                                'Saude': saude,
                                'Social': social
                            };
                        
                            const valoresOrdenados = Object.entries(valores).sort((a, b) => b[1] - a[1]);
                            // valoresOrdenados conterá as categorias ordenadas pelo valor em ordem decrescente

                            if (valoresOrdenados[1][1] === valoresOrdenados[2][1]) {
                                const escolhido = [valoresOrdenados[1], valoresOrdenados[2]];
                            } else {
                                const escolhido = valoresOrdenados[1];
                            }
                            
                            const caminhoDocumento = `usuarios/${idUsuario}/projeto_recomendacao/recomendacao`;
                            const colecao = firestore().collection('projetos');
                            
                            let primeiroId = '';
                            let segundoId = '';
                            let terceiroId = '';
                            let quartoId = '';
                            
                            const categoriasProcuradas = [valoresOrdenados[0][0], escolhido[0]];
                            
                            const consultarProjetos = async (categoria, limite) => {
                                return colecao.where('categoria', '==', categoria).limit(limite).get();
                            };
                            
                            for (const categoria of categoriasProcuradas) {
                                const consulta = await consultarProjetos(categoria, 2);
                            
                                consulta.forEach((documento, i) => {
                                    if (categoria === valoresOrdenados[0][0]) {
                                        if (i === 0) {
                                            primeiroId = documento.id;
                                        } else if (i === 1) {
                                            segundoId = documento.id;
                                        }
                                    } else if (categoria === escolhido[0]) {
                                        if (i === 0) {
                                            terceiroId = documento.id;
                                        } else if (i === 1) {
                                            quartoId = documento.id;
                                        }
                                    }
                                });
                            }
                            
                            const atualizarDocumento = async () => {
                                try {
                                    await firestore().doc(caminhoDocumento).update({
                                        'primeiro_id': primeiroId,
                                        'segundo_id': segundoId,
                                        'terceiro_id': terceiroId,
                                        'quarto_id': quartoId
                                    });
                            } catch (error) {
                                console.error('Erro ao atualizar o documento: ', error);
                            }
                        };
                        
                        atualizarDocumento();
                    } catch (error) {
                        console.error('Erro ao obter dados do usuário: ', error);
                    }
                }


        } catch (error) {
            console.error("Erro ao recomendar projeto: ", error);
        }


        };
    
        realizarRecomendacao();
    }