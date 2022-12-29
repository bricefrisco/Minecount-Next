import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import ServerQueue from "../components/ServerQueue";

const Queues = () => {
  const [unapproved, setUnapproved] = useState();
  const [websites, setWebsites] = useState();
  const [discord, setDiscord] = useState();

  useEffect(() => {
    const fetchUnapprovedServers = async () => {
      const res = await fetch("/api/servers/unapproved");
      const data = await res.json();
      if (res.status !== 200) {
        return;
      }

      setUnapproved(data);
    };

    const fetchServersWithNoWebsites = async () => {
      const res = await fetch("/api/servers/no-websites");
      const data = await res.json();
      if (res.status !== 200) {
        return;
      }

      setWebsites(data);
    };

    const fetchServersWithNoDiscord = async () => {
      const res = await fetch("/api/servers/no-discord");
      const data = await res.json();
      if (res.status !== 200) {
        return;
      }

      setDiscord(data);
    };

    fetchUnapprovedServers();
    fetchServersWithNoWebsites();
    fetchServersWithNoDiscord();
  }, []);

  return (
    <PageWrapper title="Queues">
      {Boolean(unapproved) && (
        <ServerQueue title="Approvals Needed" servers={unapproved} />
      )}

      {Boolean(websites) && (
        <ServerQueue title="Websites Needed" servers={websites} />
      )}

      {Boolean(discord) && (
        <ServerQueue title="Discord Needed" servers={discord} />
      )}
    </PageWrapper>
  );
};

export default withPageAuthRequired(Queues);
