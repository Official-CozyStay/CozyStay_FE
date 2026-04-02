declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

declare namespace kakao.maps {
  function load(callback: () => void): void;

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    getCenter(): LatLng;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    setPosition(latlng: LatLng): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  interface MarkerOptions {
    map?: Map;
    position: LatLng;
  }

  namespace services {
    class Geocoder {
      addressSearch(
        address: string,
        callback: (result: AddressSearchResult[], status: Status) => void,
      ): void;
    }

    interface AddressSearchResult {
      address_name: string;
      address_type: string;
      x: string;
      y: string;
      address: Address;
      road_address: RoadAddress | null;
    }

    interface Address {
      address_name: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
      mountain_yn: string;
      main_address_no: string;
      sub_address_no: string;
      zip_code: string;
    }

    interface RoadAddress {
      address_name: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
      road_name: string;
      underground_yn: string;
      main_building_no: string;
      sub_building_no: string;
      building_name: string;
      zone_no: string;
    }

    enum Status {
      OK = 'OK',
      ZERO_RESULT = 'ZERO_RESULT',
      ERROR = 'ERROR',
    }
  }
}
