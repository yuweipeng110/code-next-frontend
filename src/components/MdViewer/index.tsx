import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "github-markdown-css/github-markdown-light.css";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import gemoji from "@bytemd/plugin-gemoji";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import { generateID } from "@/libs/bytemd/plugins/generateID";
import { Button } from "antd";

interface Props {
  value?: string;
  isClamp?: boolean;
}

// const plugins = [gfm(), highlight()];

const plugins = [
  // tocPlugin(),
  highlight(),
  gemoji(),
  gfm(),
  mediumZoom(),
  {
    rehype: (processor: any) =>
      processor
        // 为标题生成自定义 id
        .use(() => (tree: any) => {
          generateID(tree);
        }),
    // .use(rehypeAutolinkHeadings, {
    //   behavior: 'prepend',
    //   content: () => [
    //     {
    //       type: 'element',
    //       tagName: 'span',
    //       properties: {
    //         className: ['anchor'],
    //       },
    //       children: [
    //         {
    //           type: 'text',
    //           value: '#',
    //         },
    //       ],
    //     },
    //   ],
    // }),
  },
  // codeCopyPlugin(), 
  // highlightCodeLinesPlugin(),
];

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const MdViewer: React.FC<Props> = (props) => {
  const { value = "", isClamp = false } = props;

  const [isClampState, setIsClampState] = useState<boolean>(isClamp);
  const [expand, setExpand] = useState<boolean>(true);

  const viewerRef = useRef<HTMLDivElement>(null);

  // 计算内容的行数
  const getLineCount = (element: HTMLDivElement): number => {
    if (!element) return 0;
    const lineHeight = parseFloat(getComputedStyle(element, null).lineHeight);
    const contentHeight = element.scrollHeight;
    return Math.ceil(contentHeight / lineHeight);
  };

  useEffect(() => {
    if (viewerRef.current && isClamp) {
      const lineCount = getLineCount(viewerRef.current);
      // 根据行数决定是否展开
      setIsClampState(lineCount > 3);
    }
  }, [value]);

  return (
    <>
      <div ref={viewerRef} className={`md-viewer ${isClampState && expand ? 'line-clamp-3' : ''}`}>
        <Viewer value={value} plugins={plugins} />
      </div>
      {
        isClampState && (
          <Button color="primary" variant="link" size="small" style={{ padding: "8px 0px 0px" }} onClick={() => setExpand(!expand)}> {expand ? "展开" : "收起"}</Button>
        )
      }
    </>
  );
};

export default MdViewer;
