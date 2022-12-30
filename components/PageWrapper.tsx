import Navigation from "./Navigation";

type Props = {
  title: string;
  subtitle: string;
  children: any;
};

const PageWrapper = ({ title, subtitle, children }: Props) => {
  return (
    <>
      <Navigation />
      <div className="container mx-auto mt-7 pt-7">
        <h1 className="text-5xl font-bold">{title}</h1>
        <h2 className="pt-1 text-2xl font-light">{subtitle}</h2>
        {children}
      </div>
    </>
  );
};

export default PageWrapper;
