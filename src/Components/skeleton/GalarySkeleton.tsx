import { Skeleton } from "@mui/material";

export default function GalarySkeleton() {
  return (
    <div className="p-2">
      <Skeleton
        variant="rectangular"
        height={118}
        className="custom_skeleton"
        animation="wave"
      />
      <div className="row my-2">
        <div className="col-md-4 mb-2 pr-0 d-flex align-items-center justify-content-center">
          <Skeleton
            variant="circular"
            width={60}
            height={40}
            className="custom_skeleton"
            animation="wave"
          />
        </div>
        <div className="col-md-8 pr-0">
          <Skeleton
            variant="rectangular"
            height={15}
            className="custom_skeleton"
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={"80%"}
            height={15}
            className="mt-2 custom_skeleton"
            animation="wave"
          />
        </div>
      </div>
    </div>
  );
}
