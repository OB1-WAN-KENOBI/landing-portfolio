export interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export interface HeadData {
  title: string;
  description: string;
  openGraph?: OpenGraphData;
}
