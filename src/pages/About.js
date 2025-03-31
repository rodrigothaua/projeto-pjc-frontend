import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const About = () => {

    useDocumentTitle('Sobre o Projeto');

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 p-6 text-white">
            <h1 className="text-3xl font-bold">Projeto Abitus: Sistema de Gerenciamento de Pessoas Desaparecidas</h1>
          </div>
          
          <div className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descrição Formal</h2>
              <p className="text-gray-700 leading-relaxed">
                O presente projeto consiste em uma aplicação web desenvolvida como uma Single Page Application (SPA) 
                utilizando tecnologias modernas de desenvolvimento front-end. A solução foi concebida para integrar-se 
                com a API Abitus, disponibilizada pela Polícia Judiciária Civil de Mato Grosso, com o objetivo de 
                facilitar a consulta e o compartilhamento de informações sobre pessoas desaparecidas.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Arquitetura e Tecnologias</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                A aplicação foi estruturada seguindo os princípios de componentização e separação de responsabilidades, 
                utilizando React.js como framework principal. A interface de usuário foi desenvolvida com Tailwind CSS, 
                garantindo um design responsivo e adaptável a diferentes dispositivos. Para a comunicação com a API, 
                foi implementado um serviço de requisições utilizando Axios, permitindo o consumo eficiente dos 
                endpoints disponibilizados.
              </p>
              <p className="text-gray-700 leading-relaxed">
                O sistema implementa carregamento assíncrono de rotas (Lazy Loading), otimizando o tempo de carregamento 
                inicial e melhorando a experiência do usuário. A navegação entre as diferentes seções da aplicação é 
                gerenciada pelo React Router DOM, mantendo a consistência da interface e preservando o estado da aplicação.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Funcionalidades Implementadas</h2>
              
              <div className="pl-4 border-l-4 border-blue-500 mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Visualização de Pessoas Desaparecidas</h3>
                <p className="text-gray-700 leading-relaxed">
                  A aplicação apresenta uma listagem paginada de pessoas desaparecidas, exibindo informações essenciais 
                  como nome, idade, sexo e situação atual. Cada registro é apresentado em um card com design intuitivo, 
                  destacando visualmente o status da pessoa (desaparecida ou localizada).
                </p>
              </div>
              
              <div className="pl-4 border-l-4 border-blue-500 mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Detalhamento de Casos</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ao selecionar um registro específico, o usuário é direcionado a uma página de detalhamento que apresenta 
                  informações completas sobre o caso, incluindo:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                  <li>Dados pessoais da pessoa desaparecida</li>
                  <li>Circunstâncias do desaparecimento</li>
                  <li>Última localização conhecida</li>
                  <li>Vestimentas utilizadas no momento do desaparecimento</li>
                  <li>Registro fotográfico</li>
                </ul>
              </div>
              
              <div className="pl-4 border-l-4 border-blue-500">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Envio de Informações</h3>
                <p className="text-gray-700 leading-relaxed">
                  A aplicação disponibiliza um formulário estruturado para que cidadãos possam contribuir com informações 
                  relevantes sobre os casos. O formulário implementa validação de campos e formatação adequada dos dados, 
                  além de permitir o envio de registros fotográficos e coordenadas geográficas.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Considerações Técnicas</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                O projeto foi desenvolvido com atenção às boas práticas de desenvolvimento, incluindo:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Tipagem de propriedades utilizando PropTypes</li>
                <li>Tratamento adequado de erros e estados de carregamento</li>
                <li>Componentização eficiente para reuso de código</li>
                <li>Implementação de hooks personalizados para lógicas compartilhadas</li>
                <li>Gerenciamento consistente do título do documento para melhor experiência de navegação</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                A aplicação foi projetada para ser facilmente mantida e expandida, com uma estrutura de código organizada 
                e documentada. O sistema pode ser containerizado para implantação em ambientes de produção, garantindo 
                isolamento e portabilidade.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conclusão</h2>
              <p className="text-gray-700 leading-relaxed">
                O Sistema Abitus representa uma solução tecnológica que contribui significativamente para a causa social 
                de localização de pessoas desaparecidas, facilitando tanto a divulgação de informações quanto a colaboração 
                da sociedade civil com as autoridades competentes. A interface intuitiva e responsiva, aliada à robustez 
                técnica da implementação, resulta em uma ferramenta eficaz para o propósito a que se destina.
              </p>
            </section>
          </div>
          
          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 mb-4 md:mb-0">
                Desenvolvido como parte do processo seletivo para a Polícia Judiciária Civil de Mato Grosso.
              </p>
              <a 
                href="https://abitus-api.geia.vip/v1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Documentação da API
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default About;
