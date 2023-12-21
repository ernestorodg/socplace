# Social Place

## Resumo

No atual cenário digital, os marketplaces desempenham um papel fundamental na conexão entre produtores e consumidores, proporcionando um ambiente dinâmico e acessível para transações comerciais. No entanto, marketplaces consolidados não oferecem um ambiente adequado para trocas pessoais e a criação de vínculos afetivos. Diante desse contexto, a criação deste trabalho se tornou essencial para desenvolver um sistema de marketplace que atendesse às necessidades específicas dos produtores artesanais, fornecendo-lhes uma plataforma online para comercializar seus produtos de forma eficiente e alcançar um público mais amplo. 

Dessa forma, foi desenvolvido um sistema utilizando uma arquitetura baseada em microsserviços. O sistema permite aos usuários cadastrar e buscar produtos artesanais, além de facilitar a comunicação entre compradores e vendedores. A interface foi projetada para proporcionar uma experiência intuitiva e agradável, permitindo aos usuários explorar lojas próximas por meio da localização geográfica.

Os principais benefícios da arquitetura de microserviços são a escalabilidade, flexibilidade e manutenibilidade do sistema. Os princípios SOLID e a Clean Architecture foram aplicados no desenvolvimento, garantindo um código modular e de fácil manutenção. Além disso, o uso de tecnologias como ReactJS, NestJS, Apollo e MongoDB proporcionaram um ambiente moderno e eficiente para o desenvolvimento do sistema.

Palavras-Chave: marketplace, microserviços, SOLID, Clean Architecture

## Implementação

O projeto é desenvolvido inteiramente em JavaScript. É necessário instalar a versão 15 de Node.js, incluindo o Node Package Manager (NPM).

Após instalação, rodar `npm install`


Além disso, o projeto usa o Docker Compose para inicializar um banco de dados MongoDB em um contêiner e conectar a aplicação a ele. No arquivo docker-compose.yml, é definido um serviço para o banco de dados MongoDB, especificando a imagem do MongoDB a ser utilizada e as configurações necessárias, como a porta em que o banco de dados estará disponível. Em seguida, ao executar o comando `docker-compose up`, o Docker Compose criará e iniciará o contêiner do MongoDB, permitindo que a aplicação se conecte a ele por meio das configurações definidas no código fonte da aplicação.

Para o resto das keys necessárias, use os arquivos `.env.example` para criar `.env` pessoais.

![home_logado](https://github.com/ernestorodg/socplace/assets/61739079/aafd4c74-86d5-4ab5-9405-ac6b7ee80f07)
