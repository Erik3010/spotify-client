interface NewReleaseAlbumResponse {
  albums: Album;
}

interface Album {
  items: AlbumItem[];
  total: number;
}

interface Artist {
  id: string;
  name: string;
  href: string;
}

interface AlbumItem {
  album_type: string;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  type: string;
  uri: string;
  artists: Artist[];
}
