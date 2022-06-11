import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { UserAuthProvider } from "../context/UserContext";

function GrammarlyEditor() {
  return (
    <>
      <UserAuthProvider>
        <GrammarlyEditorPlugin clientId="5c891c34-55b1-4504-b1a2-5215d35757ba">
          <textarea rows={10} />
        </GrammarlyEditorPlugin>
      </UserAuthProvider>
    </>
  );
}

export default GrammarlyEditor;
