import AxiosHelper from "@/helpers/axios.helper";
import withAxiosHelper from "@/hocs/withAxiosHelper";
import { App } from "@/interfaces/data/app.interface";
import { Screenshot } from "@/interfaces/data/screenshot.interface";
import { CircularProgress, Link, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/application-page.module.css";

interface ApplicationPageProps {
  axiosHelper?: AxiosHelper;
}

function ApplicationPage({ axiosHelper }: ApplicationPageProps) {
  const {
    query: { id: applicationId },
  } = useRouter();

  const [applicationMetadata, setApplicationMetadata] = useState<App | null>(
    null
  );
  const [applicationScreenshotList, setApplicationScreenshotList] = useState<
    Array<Screenshot>
  >([]);

  const [applicationMetadataLoading, setApplicationMetadataLoading] =
    useState<boolean>(false);
  const [
    applicationScreenshotListLoading,
    setApplicationScreenshotListLoading,
  ] = useState<boolean>(false);

  const fetchApplicationMetadata = async () => {
    try {
      setApplicationMetadataLoading(true);
      const applicationPayload = await axiosHelper?.request<App>({
        url: `/apps/${applicationId}`,
        method: "GET",
      });

      setApplicationMetadataLoading(false);
      setApplicationMetadata(applicationPayload as App);
    } catch (err) {
      setApplicationMetadataLoading(false);
    }
  };

  const fetchApplicationScreenshotList = async () => {
    try {
      setApplicationScreenshotListLoading(true);
      const applicationPayload = await axiosHelper?.request<Array<Screenshot>>({
        url: `/apps/${applicationId}/screenshots`,
        method: "GET",
      });

      setApplicationScreenshotListLoading(false);
      setApplicationScreenshotList(applicationPayload as Array<Screenshot>);
    } catch (err) {
      setApplicationScreenshotListLoading(false);
    }
  };

  useEffect(() => {
    if (applicationId?.length) {
      fetchApplicationMetadata();
      fetchApplicationScreenshotList();
    }
  }, [applicationId]);

  return (
    <div className={styles.applicationPageContainer}>
      {applicationMetadataLoading ? (
        <CircularProgress />
      ) : (
        <div className={styles.applicationMetadataContainer}>
          <Typography variant="h5" align="center">
            {applicationMetadata?.name}
          </Typography>
          <div className={styles.applicationTextRowContainer}>
            <Typography
              className={styles.applicationBoldText}
              variant="body1"
              component="b"
            >
              Link:
            </Typography>
            <Link
              href={applicationMetadata?.url}
              className={styles.applicationNormalText}
            >
              {applicationMetadata?.url}
            </Link>
          </div>
          <div className={styles.applicationTextRowContainer}>
            <Typography
              className={styles.applicationBoldText}
              variant="body1"
              component="b"
            >
              Start Time:
            </Typography>
            <Typography
              variant="body1"
              className={styles.applicationNormalText}
            >
              {applicationMetadata?.startTime
                ? new Date(applicationMetadata?.startTime)?.toUTCString()
                : "N/A"}
            </Typography>
          </div>
        </div>
      )}
      {applicationScreenshotListLoading ? (
        <CircularProgress />
      ) : (
        <div className={styles.applicationScreenshotListContainer}>
          {applicationScreenshotList.map(
            (applicationScreenshot: Screenshot) => (
              <div className={styles.applicationScreenshotContainer}>
                <div className={styles.applicationTextRowContainer}>
                  <Typography className={styles.applicationBoldText}>
                    Screenshot Time:
                  </Typography>
                  <Typography className={styles.applicationNormalText}>
                    {new Date(applicationScreenshot.timestamp)?.toUTCString()}
                  </Typography>
                </div>
                <img src={applicationScreenshot.imageUrl} />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default withAxiosHelper<ApplicationPageProps>(ApplicationPage);
