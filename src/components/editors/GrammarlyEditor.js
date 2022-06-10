import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";

function GrammarlyEditor() {
  return (
    <>
      <GrammarlyEditorPlugin clientId="5c891c34-55b1-4504-b1a2-5215d35757ba">
        <textarea rows={10}/>
      </GrammarlyEditorPlugin>
    </>
  );
}

export default GrammarlyEditor;
