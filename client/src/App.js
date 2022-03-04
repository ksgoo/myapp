import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const BoatDef = {
   id: '',
   callsign: '',
   alias: '',
   swimlane: '',
   status: '',
   guide: '',
   phone: '',
 }


function App() {

   const [ boats, setBoats ] = useState([BoatDef]);
   const [ boat, setBoat ] = useState(BoatDef);

   function requestBoats() {
     fetch('/boats')
		.then(res => res.json())
		.then(res => {
			setBoats(res);
		    setBoat(BoatDef);
		});
   }

   useEffect(() => {
	  requestBoats();
   }, [])

  function handleChange(evt) {
	  const {name, value} = evt.target;
	  setBoat(prev => ({
		  ...prev,
		  [name]: value
	  }));
  }

  function addBoat(evt) {
	  if (!boat.callsign) {
		  alert('callsign cannot be empty');
		  return;
	  }

	  const newBoat = {
		  id: boat.id,
		  callsign: boat.callsign,
		  alias: boat.alias,
		  status: boat.status || "DOCK",
		  swimlane: boat.swimlane || 21,
		  guide: boat.guide,
		  phone: boat.phone,
	  };

	  axios.post('/boats', newBoat)
		.then(() => {
//		    alert(`Added new boat ${boat.id}`);
		    requestBoats();
		})
		.catch( e => {
			alert(e.message);
			console.error(e.message);
		});
  }

  function updateBoat(evt, foundBoat) {
	  const updateBoat = {};
	  Object.entries(boat).forEach(function([k,v]) {
		  if (v) {
			  updateBoat[k] = v
		  }
	  });

	  axios.patch('/boats/' + foundBoat._id, updateBoat)
		.then(() => {
//			alert(`Updated boat ${boat.id}`);
			requestBoats();
		})
		.catch( e => {
			alert(e.message);
			console.error(e.message);
		});
  }

  function submitBoat(evt) {
	  if (!boat.id) {
		  alert('ID cannot be empty');
		  return;
	  }
	  else if (isNaN(boat.id)) {
		  alert('ID must be a number');
		  setBoat({...boat, id: ''});
		  return;
	  }
	  else if (boat.swimlane && isNaN(boat.swimlane)) {
		  alert('swimlane must be a number');
		  setBoat({...boat, swimlane: ''});
		  return;
	  }

	  setBoat({
		  ...boat,
		  id: parseInt(boat.id),
		  swimlane: boat.swimlane ? parseInt(boat.swimlane) : null,
	  });


	  const foundBoat = boats.filter(b => b.id == boat.id);
	  if (foundBoat.length) {
		  updateBoat(evt, foundBoat[0]);
	  } else {
		  addBoat(evt);
	  }

	  evt.preventDefault();
  }

  function deleteBoat(id) {
	  axios.delete('/boats/' + id)
		.then(() => {
		  console.log(`boat ${id} deleted successfully`);
		  requestBoats();
		})
		.catch( e => console.error(e.message) );
  }

  return (
    <div className="App">
	  <h1>Boats List</h1>
	  <table style={{width: "100%"}}>
		<thead>
			<tr>
				<th scope="col"></th>
				<th scope="col">ID</th>
				<th scope="col">Callsign</th>
				<th scope="col">Alias</th>
				<th scope="col">Status</th>
				<th scope="col">Swimlane</th>
				<th scope="col">Guide</th>
				<th scope="col">Phone</th>
			</tr>
		</thead>

		<tbody>
			{boats.map(boat => {
				return (
				  <tr>
					<th scope="row">
						<button onClick={() => deleteBoat(boat._id)}>Delete</button>
					</th>
					<th scope="row">{boat.id}</th>
					<th scope="row">{boat.callsign}</th>
					<th scope="row">{boat.alias}</th>
					<th scope="row">{boat.status}</th>
					<th scope="row">{boat.swimlane}</th>
					<th scope="row">{boat.guide}</th>
					<th scope="row">{boat.phone}</th>
				  </tr>
				)
			  })
			}
		</tbody>
	  </table>

	  <div style={{justifyContent: "left"}}>
	  <form>
		  <label>*ID:
		  	<input onChange={handleChange} type="text" name="id" value={boat.id}></input>
		  </label>
	  </form>
	  <form>
		  <label>Callsign:
		  	<input onChange={handleChange} type="text" name="callsign" value={boat.callsign}></input>
		  </label>
	  </form>
	  <form>
		  <label>Alias:
		  	<input onChange={handleChange} type="text" name="alias" value={boat.alias}></input>
		  </label>
	  </form>
	  <form>
		  <label>Status:
		  	<input onChange={handleChange} type="text" name="status" value={boat.status}></input>
		  </label>
	  </form>
	  <form>
		  <label>Swimline:
		  	<input onChange={handleChange} type="text" name="swimlane" value={boat.swimlane}></input>
		  </label>
	  </form>
	  <form>
		  <label>Guide:
		  	<input onChange={handleChange} type="text" name="guide" value={boat.guide}></input>
		  </label>
	  </form>

	  <button onClick={submitBoat}>{boats.some(b => b.id == boat.id) ? 'UPDATE' : 'ADD'} BOAT</button>
	  </div>

    </div>
  );
}

export default App;
