import { ManagerTable } from "../components/ManagerTable";

export const ManagerPage = (state) => {
  return (
    <div className="manager-page">
      <div className="expenses-title">
        <div>
          <h1>Manager page</h1>{/* <h1>Hello {userData.name}!</h1> */}
          <h3>This page is for managers</h3>
        </div>
      </div>
      <div className='expenses-content'>
        <div className='expenses-content-title'>
          <h4>Pending expenses</h4>
        </div>
        <ManagerTable id={state.user.attributes.sub}/>
      </div>
    </div>
  );
};
