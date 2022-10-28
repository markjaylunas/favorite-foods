import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import UsageTable from "../../components/ApiUsagePage/UsageTable";
import { Loader } from "@mantine/core";

type ApiUsageRecord = {
  id: string;
  api_name: string;
  called_at: Date;
  called_by: string;
};

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [apiUsageList, setApiUsageList] = useState<ApiUsageRecord[] | null>(
    null
  );
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchApiUsageRecord = async () => {
      const { data, error } = await supabase
        .from("api_usage_record")
        .select("*");
      const userData = data as unknown as ApiUsageRecord[];
      if (error) console.error(error);
      console.log(data);
      setApiUsageList(userData);
      setLoading(false);
    };
    fetchApiUsageRecord();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>API Usage Records</title>
        <meta name="description" content="Table of API Usage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>API Usage Records</h1>
      </header>
      <main className={styles.main}>
        {apiUsageList !== null && !loading ? (
          <UsageTable usageList={apiUsageList} />
        ) : (
          <Loader />
        )}
      </main>
    </div>
  );
};

export default Home;
