import React from 'react';

const CadastrarDemanda = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'relative',
                marginBottom: '1rem',
                position: 'relative',
                top: '0rem'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#24213B',
                    marginLeft: '16rem'
                }}>
                    Cadastrar Demanda
                </h1>
            </div>

            <div style={{
                maxWidth: '1350px',
                height: '700px',
                margin: '0 auto',
                padding: '2rem',
                backgroundColor: '#F5F4FF',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginTop: '2rem'
            }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ fontWeight: 'bold', color: '#24213B' }}>
                        Título
                        <input
                            type="text"
                            placeholder="Título do projeto"
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                border: '1px solid #DDD',
                                borderRadius: '8px',
                                marginTop: '0.5rem',
                            }}
                        />
                    </label>

                    <label style={{ fontWeight: 'bold', color: '#24213B', marginTop: '1rem' }}>
                        Links Úteis
                        <input
                            type="url"
                            placeholder="Informe links úteis"
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                border: '1px solid #DDD',
                                borderRadius: '8px',
                                marginTop: '0.5rem',
                            }}
                        />
                    </label>

                    <div style={{ fontWeight: 'bold', color: '#24213B', marginTop: '1rem' }}>
                        <label>Anexo</label>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '0.5rem',
                        }}>
                            <button type="button" style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#6C63FF',
                                color: 'white',
                                borderRadius: '30px',
                                border: 'none',
                                cursor: 'pointer',
                            }}>Adicionar anexo</button>
                        </div>
                    </div>

                    <label style={{ fontWeight: 'bold', color: '#24213B', marginTop: '1rem' }}>
                        Descrição
                        <textarea
                            placeholder="Digite o texto..."
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                border: '1px solid #DDD',
                                borderRadius: '8px',
                                marginTop: '0.5rem',
                            }}
                        />
                    </label>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '40px 0 0 0' }}>
                        <button type="button" style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'transparent',
                            border: '1px solid #6C63FF',
                            borderRadius: '30px',
                            color: '#6C63FF',
                            cursor: 'pointer'
                        }}>Cancelar</button>
                        <button type="submit" style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#6C63FF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer'
                        }}>Cadastrar demanda</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastrarDemanda;
