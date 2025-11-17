import { useRef } from "react";
import { useLoaderData } from "react-router";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
    const data = useLoaderData();
    const mapRef = useRef(null);
    const position = [23.6850, 90.3563];

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = data.find(center => center.district.toLowerCase().includes(location.toLowerCase()));
        if (district) {
            const coordinate = [district.latitude, district.longitude];
            mapRef.current.flyTo(coordinate, 12);
        }
    }

    return (
        <div className="bg-base-100 rounded-4xl py-20 px-[109px] mb-24">
            <h2 className="font-extrabold text-5xl text-secondary mb-[50px]">We are available in 64 districts</h2>

            {/* search */}
            <div>
                <form onSubmit={handleSearch}>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input name="location" type="search" className="grow" placeholder="Search" />
                    </label>
                </form>
            </div>

            <div className="divider my-[50px]"></div>

            <h3 className="text-secondary font-extrabold text-[30px] mb-[30px]">We deliver almost all over Bangladesh</h3>

            {/* map */}
            <div>
                <MapContainer center={position}
                              zoom={8}
                              scrollWheelZoom={false}
                              ref={mapRef}
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