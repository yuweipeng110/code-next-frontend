import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "github-markdown-css/github-markdown-light.css";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";

interface Props {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}
const plugins = [gfm(), highlight()];

// const plugins = [
//   gfm({ locale: pluginGfmZhHans }),
//   highlight(),
//   mediumZoom(),
//   gemoji(),
//   math({ locale: pluginMathZhHans }),
//   mermaid({ locale: pluginMermaidZhHans }),
//   breaks(),
//   footnotes(),
//   frontmatter(),
//   externalLinks({ test: href => true }),
//   alignPlugin(),
//   imagePlugin(),
//   themePlugin({ cb: changeThemeCb }),
//   highLightPlugin({ cb: changeHighlightCb })
// ];

/**
 * Markdown 编辑器
 * @param props
 * @constructor
 */
const MdEditor = (props: Props) => {
  const { value = "", onChange, placeholder } = props;

  return (
    <div className="md-editor">
      <Editor
        value={value || ""}
        placeholder={placeholder}
        mode="split"
        plugins={plugins}
        onChange={onChange}
      />
    </div>
  );
};

export default MdEditor;
