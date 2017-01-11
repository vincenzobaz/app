
import {DeleteAllData} from "../components/account/DeleteAllData";
import {LogOut} from "../components/account/LogOut";
import {BlacklistSelection} from "../components/account/BlacklistSelection";

export class Account extends React.Component<{}, {}>{

  render() {
    return (
      <div>
        <h2>Account</h2>
        <LogOut />
        <DeleteAllData />
        <BlacklistSelection />
      </div>
    );
  }

}
