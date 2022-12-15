import { useState } from "react";
import { Table } from "react-bootstrap";


type ZonesFormData = {
    zone: string,
    drones: string,
    lastUpadte: string,
    DWDAssessment: string,
    AIAssessment: string
}


const Dashboard = () => {
    const [form, setForm] = useState({
        zone: "",
        drones: "",
        lastUpadte: "",
        DWDAssessment: "",
        AIAssessment: ""
    } as ZonesFormData);

    return (
        <div className="app">
            <Table className="table mx-lg-5">
                <thead>
                    <tr>
                        <th scope="col">Zonen</th>
                        <th scope="col">Drohnen</th>
                        <th scope="col">Lestes Update</th>
                        <th scope="col">Brandgefahreinschatzung</th>
                        <th scope="col">KI Einschatzung</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>

        </div >
    );
}

export default Dashboard;