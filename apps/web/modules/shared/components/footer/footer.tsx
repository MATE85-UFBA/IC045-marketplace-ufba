const Footer = () => {
  return (
    <footer className="bg-primary py-5 flex justify-center">
      <p className="text-white font-bold w-fit text-center">
        Copyright © 2024
        {new Date().getFullYear() === 2024
          ? " "
          : `- ${new Date().getFullYear()} `}
        Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;
