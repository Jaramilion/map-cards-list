import { Loading } from "@/components/Loading";
import { Outlet, useNavigation } from "react-router";

export function RootLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <div>
      {isNavigating && <Loading />}
      <Outlet />
    </div>
  );
}
