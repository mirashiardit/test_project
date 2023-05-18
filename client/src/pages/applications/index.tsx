import ApplicationPostInput from "@/components/ApplicationPostInput";
import { applicationTableColumns } from "@/consts/tables/application-table.consts";
import AxiosHelper from "@/helpers/axios.helper";
import withAxiosHelper from "@/hocs/withAxiosHelper";
import { App } from "@/interfaces/data/app.interface";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import styles from "../../styles/applications-page.module.css";


interface ApplicationsPageProps {
  axiosHelper?: AxiosHelper;
}

function ApplicationsPage({ axiosHelper }: ApplicationsPageProps) {
  const [applications, setApplications] = useState<Array<App>>([]);
  const [applicationsLoading, setApplicationsLoading] =
    useState<boolean>(false);

  useEffect(() => {
    fetchApplicationsHandler();
  }, []);

  const fetchApplicationsHandler = async () => {
    try {
      setApplicationsLoading(true);
      const applicationList = await axiosHelper?.request<Array<App>>({
        method: "GET",
        url: "/apps",
      });
      setApplications(applicationList || []);
      setApplicationsLoading(false);
    } catch (err) {
      setApplications([]);
      setApplicationsLoading(false);
    }
  };

  return (
    <div className={styles.applicationsPageContainer}>
      <ApplicationPostInput onFetchApplications={fetchApplicationsHandler} />
      <div className={styles.applicationsPageTableContainer}>
        <DataGrid
          columns={applicationTableColumns}
          rows={applications}
          loading={applicationsLoading}
          hideFooter
          disableColumnMenu
          disableColumnSelector
          disableVirtualization
        />
      </div>
    </div>
  );
}

export default withAxiosHelper<ApplicationsPageProps>(ApplicationsPage);
