import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import copyBtn from "./copy.svg";
import boltIcon from "./bolt.svg";

function App() {
  const convertHTMLtoJSX = () => {
    const html = document.getElementById("htmlID").value;
    axios.post("https://html2jsx-node.herokuapp.com/convert", { html: html }).then((res) => {
      const output = document.getElementById("outputID");
      output.value = res.data.jsx;
    });
  };

  const copy = () => {
    document.querySelector("#outputID").select();
    document.execCommand("copy");
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
  };

  const paste = async () => {
    const text = await navigator.clipboard.readText();
    document.querySelector("#htmlID").value = text;
  };
  return (
    <div className="container-fluid">
      <div className="row p-5">
        <div className="col-6">
          <div className="form-group">
            <textarea spellcheck="false" className="form-control" id="htmlID"></textarea>
          </div>
          <div class="paste-btn ml-auto">
            <button
              onClick={paste}
              type="button"
              className="btn btn-outline-warning ml-auto d-block"
            >
              Paste
            </button>
          </div>
        </div>

        <div className="col-6">
          <div className="position-relative">
            <div className="form-group">
              <textarea spellcheck="false" className="form-control" id="outputID"></textarea>
            </div>

            <div className="position-absolute copyBtn" title="Copy">
              <img src={copyBtn} onClick={copy} />
            </div>
            {/* <div>
              <button className="btn position-absolute bolt">
                <img src={boltIcon} className="position-relative " />
              </button>
            </div> */}
          </div>

          <div className="d-flex justify-content-end">
            <div>
              <button
                onClick={convertHTMLtoJSX}
                type="button"
                className="btn btn-outline-success"
              >
                Convert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
