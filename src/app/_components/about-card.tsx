import Image from "next/image";

const AboutCard = () => {
  return (
    <div className="bg-purple-800 rounded-lg shadow-lg p-6 w-[55%]">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        {/* ESQUERDA: Texto */}
        <div className="flex flex-col w-full md:w-1/2 space-y-4">
          <h4 className="text-2xl font-extrabold text-white p-3">
            Nossa História
          </h4>
          <p className="text-gray-300 text-lg font-semibold text-justify">
            A equipe BuscaGames foi criada em fevereiro de 2025 com base nos
            projetos mensais propostos pela FIAP para desenvolvermos nossos
            conhecimentos. Somos uma equipe de estudantes do curso de Sistema de
            Informações apaixonada por games e tecnologia, unida pelo objetivo
            de compartilhar conhecimento, novidades e experiências do universo
            gamer. Cada membro traz sua visão única — seja em desenvolvimento,
            design ou curadoria de conteúdo — para criar um espaço completo para
            quem vive e respira jogos. Acreditamos no poder dos games de
            conectar pessoas, contar histórias e transformar realidades.
          </p>
        </div>

        {/* DIREITA: Imagem */}
        <div className="flex w-full md:w-1/2 justify-center items-start">
          <Image
            alt="team"
            src="/team.png"
            width={300}
            height={300}
            className="w-full max-w-[300px] md:max-w-[500px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
