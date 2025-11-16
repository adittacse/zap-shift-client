import { useLoaderData } from "react-router";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
    const data = useLoaderData();

    const position = [23.6850, 90.3563];

    return (
        <div className="bg-base-100 rounded-4xl py-20 px-[109px] mb-24">
            <h2 className="font-extrabold text-5xl text-secondary">We are available in 64 districts</h2>

            <div>
                <MapContainer center={position}
                              zoom={8}
                              scrollWheelZoom={false}
                              className="h-[826px]"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        data.map((center, index) => <Marker key={index} position={[center.latitude, center.longitude]}>
                            <Popup>
                                <strong>{center.district}</strong> <br />
                                Service Area: {center.covered_area.join(", ")}
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;