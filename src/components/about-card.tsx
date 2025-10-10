import Image from "next/image"

const AboutCard = () => {
  return (
    <div className="w-[55%] rounded-lg bg-purple-800 p-6 shadow-lg">
      <div className="flex h-full flex-col gap-8 md:flex-row">
        {/* ESQUERDA: Texto */}
        <div className="flex w-full flex-col space-y-4 md:w-1/2">
          <h4 className="p-3 text-2xl font-extrabold text-white">
            Nossa História
          </h4>
          <p className="text-justify text-lg font-semibold text-gray-300">
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
        <div className="flex w-full items-start justify-center md:w-1/2">
          <Image
            alt="team"
            src="/team.png"
            width={300}
            height={300}
            className="h-auto w-full max-w-[300px] md:max-w-[500px]"
          />
        </div>
      </div>
    </div>
  )
}

export default AboutCard
