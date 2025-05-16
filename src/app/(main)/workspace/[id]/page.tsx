import ChatView from "@/components/custom/ChatView";

const WorkspacePage = () => {
  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <ChatView />
        <div className="col-span-2">
          <ChatView />
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
