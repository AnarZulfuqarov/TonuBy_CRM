import "./index.scss";
import {Outlet} from "react-router-dom";
import SuperAdminNavbar from "../SuperAdminNavbar/index.jsx";
import SuperAdminLeftBar from "../SuperAdminLeftBar/index.jsx";

function SuperAdminPage() {
    return (
        <div id="superAdmin">
            <div className={"row"}>
                <SuperAdminNavbar/>
            </div>
            <div className={"row"}>
                <div className={"col-10"}>
                        <SuperAdminLeftBar/>
                </div>
                <div className={"col-50"} style={{
                    padding: "16px 16px 16px 0"
                }}>
                       <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default SuperAdminPage;