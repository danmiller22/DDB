import Head from "next/head";
import FleetDashboardCanvas from "../components/FleetDashboardCanvas";

export default function Home() {
  return (
    <>
      <Head>
        <title>UTCN Fleet Dashboard</title>
        <meta
          name="description"
          content="UTCN Fleet Dashboard — liquid glass overview for trucks, trailers, repairs and expenses."
        />
      </Head>
      <FleetDashboardCanvas />
    </>
  );
}
