interface NewReleaseAlbumResponse {
  albums: Album;
}

interface Album {
  items: AlbumItem[];
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
}
