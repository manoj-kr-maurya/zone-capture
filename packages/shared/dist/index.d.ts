export type Coordinates = {
    lat: number;
    lng: number;
    timestamp: string;
};
export type Runner = {
    id: string;
    name: string;
    path: Coordinates[];
    updatedAt: string;
};
export type Zone = {
    id: string;
    ownerId: string;
    polygon: Coordinates[];
    capturedAt: string;
};
export type TrackLocationPayload = {
    runnerId: string;
    location: Coordinates;
};
export type CreateZonePayload = {
    ownerId: string;
    polygon: Coordinates[];
};
export type CaptureZonePayload = {
    zoneId: string;
    runnerId: string;
};
