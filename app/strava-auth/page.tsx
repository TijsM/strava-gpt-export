const StravaAuthPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <>
      <div>{JSON.stringify(params, null, 2)}</div>
      <div>{JSON.stringify(searchParams, null, 2)}</div>
    </>
  );
};

export default StravaAuthPage;
