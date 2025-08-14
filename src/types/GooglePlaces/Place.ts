export interface PlacesResponse {
  places: Place[];
}

export interface Place {
  displayName: LocalizedText;
  formattedAddress: string;
  location: LatLng;
  viewport: ViewPort;
}

export interface LocalizedText {
  text: string;
  languageCode: string;
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface ViewPort {
  low: LatLng;
  high: LatLng;
}