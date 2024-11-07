const Footer = () => {
  return (
    <footer className="bg-primary  py-5 flex justify-center">
      <p className="text-white font-bold w-fit">
        Copyright ©{new Date().getFullYear()} Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;
