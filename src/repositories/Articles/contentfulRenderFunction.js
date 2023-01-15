﻿import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

function renderOptions(links) {
  // create an asset map
  const assetMap = new Map();
  // loop through the assets and add them to the map
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }

  // create an entry map
  const entryMap = new Map();
  // loop through the block linked entries and add them to the map
  for (const entry of links.entries.block) {
    entryMap.set(entry.sys.id, entry);
  }

  // loop through the inline linked entries and add them to the map
  for (const entry of links.entries.inline) {
    entryMap.set(entry.sys.id, entry);
  }
  const entryBlockMap = entryMap;

  return {
    // other options...

    renderNode: {
      // other options...
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        // find the entry in the entryMap by ID
        const entry = entryMap.get(node.data.target.sys.id);

        // render the entries as needed
        if (entry.__typename === "BlogPost") {
          return <a href={`/blog/${entry.slug}`}>{entry.title}</a>;
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        // find the entry in the entryMap by ID
        const entry = entryBlockMap.get(node.data.target.sys.id);

        if (entry.__typename === "VideoEmbed") {
          return (
            <iframe
              src={entry.embedUrl}
              height="100%"
              width="100%"
              frameBorder="0"
              scrolling="no"
              title={entry.title}
              allowFullScreen={true}
            />
          );
        }
        if (entry.__typename === "YoutubeVideoEmbed") {
          return (
            <div className={"videoIframe"}>
              <iframe
                className="video"
                src={entry.ytembedUrl}
                title={entry.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          );
        }
        if (entry.__typename === "GenericImage") {
          return <img src={entry.image.url} alt={entry.title} />;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        // find the asset in the assetMap by ID
        const asset = assetMap.get(node.data.target.sys.id);

        // render the asset accordingly
        return <img src={asset.url} alt={asset.title} />;
      },
    },
  };
}

// Render post.body.json to the DOM using
// documentToReactComponents from "@contentful/rich-text-react-renderer"

export default function BlogPost({ post }) {
  return (
    <>
      {documentToReactComponents(
        post.body.json,
        renderOptions(post.body.links)
      )}
    </>
  );
}

export const richTextToReactNode = (json, links) =>
  documentToReactComponents(json, renderOptions(links));
