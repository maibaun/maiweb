import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button, createStyles, FormControl, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, withStyles } from '@material-ui/core';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import GoogleMapReact from "google-map-react";
import firebase, { storage } from "firebase";
import i18n from "i18next";
import { time, timeStamp } from 'console';
import ItemTable from '../Stores/ItemTable';
import Additems from '../Stores/Additems';
import Firebase, { constructor, firestore } from 'firebase'
import Swal from 'sweetalert2';
import CloseIcon from '@material-ui/icons/Close';
import { render } from '@testing-library/react';
import { downloadImageToStorage } from '../../fQuery';
import { storageSvc } from '../../fBase';
import { AttachmentType } from '../Places/PlacesPopup';

// const MAP_APIKEY = `AIzaSyCfYCam9LoTBqherZAtERrPrkOD1ZzlSzU`;
// const GEOCODING_APIKEY = `${process.env.REACT_APP_GEOCODING_API_KEY}`;

// const K_MARGIN_TOP = 30;
// const K_MARGIN_RIGHT = 30;
// const K_MARGIN_BOTTOM = 30;
// const K_MARGIN_LEFT = 30;

// const K_HOVER_DISTANCE = 30;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    textField: {
              marginLeft: theme.spacing(1),
              marginRight: theme.spacing(1),
              width: 200,
            },
    table: {
        minWidth: 650,
    },
    tblcenter: {
        alignContent: "center"
    },
    tableHead: {
        backgroundColor: "#09014a"
    }
  }),
);


const StyledTableCell = withStyles((theme: Theme) =>
createStyles({
  head: {
    backgroundColor: '#320875',
    color: '#320875',
  },
  body: {
    fontSize: 14,
  },
}),
)(TableCell);
const StyledTableRow = withStyles((theme: Theme) =>
createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}),
)(TableRow);
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: 200,
//     },
//   }),
// );


function Stores(this: any) {
    const classes = useStyles();


    const [inputs, setInputs] = useState({
        usertype: "",
        });
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
        target: { name, value },
        } = event;
        setInputs((prevState) => ({ ...prevState, [name]: value }));
    }

    

    const [store , setStore] = useState<any>([]);
    const [item, setItem] = useState<any>([]);
    const [storename, setStorename] = useState("");
    const [address, setAddress] = useState("");
    const [hoursfrom, setHoursFrom] = useState("");
    const [hoursto, setHoursto] = useState("");
    const [storetag, setStoretags] = useState("");
    const [ratings, setRatings] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState<any>("");
    const [imgData, setImgData]= useState<any>(null);
    const [img1, setImg1] = useState("");
    ////////////////////////////////////////////////
    const [item_name, setItemname] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const [photo, setPhoto] = useState();
    const [picture2, setPicture2] = useState<any>("");
    const [imgData2, setImgData2]= useState<any>(null);
    const [desc, setDescriptions] = useState("");

    const onChangePicture = (e:any) =>{

      if(e.target.files[0]){
        console.log("PIcture", e.target.files);
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    }

    const onChangePicture2 = (e:any) =>{

      if(e.target.files[0]){
        console.log("PIcture2", e.target.files);
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData2(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    }




    ////////////////////////////////////////////
    useEffect(() => {
        Firebase
          .firestore()
          .collection("store_infos")
          .orderBy("created_at", "desc")
          .onSnapshot(snapshot => {
            const listItems = snapshot.docs.map(doc => ({
              id : doc.id,
              ...doc.data()

            }));
            setStore(listItems); //items is equal to listItems
             console.log("sasdasdas", listItems)
          });
      }, []);
    ////////////////////////////////////////////
      useEffect(() => {
        Firebase
          .firestore()
          .collection("store_items")
          .orderBy("created_at", "desc")
          .onSnapshot(snapshot => {
            const listItems = snapshot.docs.map(doc => ({
              id : doc.id,
              ...doc.data()

            }));
            setItem(listItems); //items is equal to listItems
             console.log("sasdasdas", listItems)
          });
      }, []);
    ////////////////////////////////////////////
      function deleteDocId(value: any){
        const db = Firebase.firestore();
        // db.collection('store_infos').doc(`${value}`).delete()
        const SwalModal = (Swal);
        Swal.fire({
          title: 'Are you sure you want to delete this store?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            const db = Firebase.firestore();
            db.collection('store_infos').doc(`${value}`).delete()
            Swal.fire(
              'Deleted!',
              'This Store has been deleted.',
              'success'
            )
          }
        })
    }
    ////////////////////////////////////////////
    function deleteDocId2(value: any){
        const db = Firebase.firestore();
        // db.collection('store_infos').doc(`${value}`).delete()
        const SwalModal = (Swal);
        Swal.fire({
          title: 'Are you sure you want to delete this Item?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            const db = Firebase.firestore();
            db.collection('store_items').doc(`${value}`).delete()
            Swal.fire(
              'Deleted!',
              'This Item has been deleted.',
              'success'
            )
          }
        })
    }
    ////////////////////////////////////////////
    const saveStore = () =>{
        Swal.fire({
            title: 'Do you want to save this Store?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const db = firebase.firestore();
                const storageRef = Firebase.storage().ref();
                // const filename = 'store';
                db.collection('store_infos').doc().set({
                    storename,
                    address,
                    storetag,
                    ratings,
                    description,
                    hoursfrom: Date(),
                    hoursto: Date(),
                    created_at: new Date()
                })
                db.collection("store_infos")
                  .orderBy("created_at", "desc")
                  .limit(1)
                  .onSnapshot(function(snapshot){
                    snapshot.forEach(function(doc){
                      console.log(">>>>>>>>>", doc.id);
                      const filename = doc.id;

                console.log('start uplaod')
                // if(picture === ''){
                //   console.error(`not an image, the image file is a ${typeof(picture)}`)
                // }
                const uploadTask = storageRef.child(`store_infos/${filename}/${filename}_01.jpg`).put(picture);
              })
              })
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Store not saved', '', 'info')
            }
          })
    }
    ////////////////////////////////////////////

    const [attachment, setAttachment] = useState<AttachmentType[] | null>([]);
    //  const arrImg = (arrImgUrl && [...photos, ...arrImgUrl]) || [...photos];

    const downloadImageToStorage = async (photos: string[]) => {
      const arrPhotoUrl = photos.map(async (photo) => {
        const photoUrl = await storageSvc.ref(photo).getDownloadURL();
        return { img: photoUrl, orgImg: photo };
      });
    
      const arrPhoto = await Promise.all(arrPhotoUrl);
      return arrPhoto;
    };

    const getImgUrl = async (photos: string[]) => {
      const arrImg = await downloadImageToStorage(photos);
      setAttachment(arrImg);
      console.log("get IMG URL .............", arrImg)
    };


    const saveItem = () =>{
        Swal.fire({
            title: 'Do you want to save this Item?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const db = firebase.firestore();
                const storageRef = Firebase.storage().ref();
                db.collection('store_items').doc().set({
                    item_name,
                    qty,
                    price,
                    desc,
                    created_at: new Date()
                })
                db.collection("store_items")
                  .orderBy("created_at", "desc")
                  .limit(1)
                  .onSnapshot(function(snapshot){
                    snapshot.forEach(function(doc){
                      console.log(">>>>>>>>>", doc.id);
                      const filename = doc.id;

                console.log('start uplaod')
                // if(picture === ''){
                //   console.error(`not an image, the image file is a ${typeof(picture)}`)
                // }
                const uploadTask = storageRef.child(`store_items/${filename}/${filename}_01.jpg`).put(picture);
                uploadTask.on('state_changed', function(snapshot){
                  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case Firebase.storage.TaskState.PAUSED: // or 'paused'
                      console.log('Upload is paused');
                      break;
                    case Firebase.storage.TaskState.RUNNING: // or 'running'
                      console.log('Upload is running');
                      break;
                  }
                }, function(error) {
                }, function() {
                  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                  });
                });
              })
              })
            
              Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Item not saved', '', 'info')
            }
          })
    }
    ////////////////////////////////////////////
    function initAutocomplete(){
        const map = new google.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
                center: { lat: -33.8688, lng: 151.2195 },
                zoom: 12,
                mapTypeId: "roadmap",
            }
        );

        const input = document.getElementById("pac-input") as HTMLInputElement;
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        map.addListener("bounds_changed", ()=>{
            searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
        });

        let markers: google.maps.Marker[] = [];
        searchBox.addListener("places_changed", ()=>{
            const places = searchBox.getPlaces();

            if(places.length == 0){
                return;
            }

            markers.forEach((marker) =>{
                marker.setMap(null);
            });
            markers = [];

            const bounds = new google.maps.LatLngBounds();
            places.forEach((place) =>{
                if(!place.geometry){
                    console.log("error")
                    return;
                }
                const icon = {
                    url: place.icon as string,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                  };

                markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
                );

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                  } else {
                    bounds.extend(place.geometry.location);
                  }
            });
            map.fitBounds(bounds);
        });
    }



  return (
      <>
       <body>

            <div style={{ padding: 20 , backgroundColor: '#ffffff', borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
            <h2>Add Store</h2>
            <Grid container className={classes.root} spacing={2}>
            <FormControl variant="outlined" >
                <Grid item xs={6}>
                    <div  style={{width: 500}}>
                <TextField
                    type="text"
                    variant="outlined"
                    label="Store Name"
                    name="storename"
                    placeholder="Store Name"
                    fullWidth
                    value={storename}
                    onChange={e => {
                    setStorename(e.target.value);
                    }}
                    required
                />

                <TextField
                    id="pac-input"
                    type="text"
                    variant="outlined"
                    label="Address"
                    name="address"
                    placeholder="Address"
                    fullWidth
                    value={address}
                    onChange={e => {
                    setAddress(e.target.value);
                    }}
                    required
                    style={{marginTop: '10px'}}
                />
                {/* <TextField
                id="pac-input"
                name="pac-input"
                type="text"
                placeholder="Search Place"
                />
                <div id="map" style={{ height: '100px', width: '100%' }}></div> */}
                <div>
                    <h4>Opening Hours</h4>
                <TextField
                    id="time"
                    label="From"
                    type="time"
                    value={hoursfrom}
                    onChange={e => {
                        setHoursFrom(e.target.value);
                        }}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                />
                 <TextField
                    id="time"
                    label="To"
                    type="time"
                    value={hoursto}
                    onChange={e => {
                        setHoursto(e.target.value);
                        }}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                />
                </div>
                {/* <div>
                    <h4>Floor plans</h4>
                    <TextField
                        type="file"
                        variant="outlined"
                        name="floorplans"
                        fullWidth
                        required
                        style={{marginTop: '10px'}}
                    />
                </div> */}
                <TextField
                    type="text"
                    variant="outlined"
                    label="Store Tag"
                    name="storetags"
                    placeholder="Store Tag"
                    fullWidth
                    required
                    value={storetag}
                    onChange={e => {
                    setStoretags(e.target.value);
                    }}
                    style={{marginTop: '10px'}}
                />
                <TextField
                    type="number"
                    variant="outlined"
                    label="Ratings"
                    name="ratings"
                    placeholder="Ratings"
                    required
                    value={ratings}
                    onChange={e => {
                    setRatings(e.target.value);
                    }}
                    style={{marginTop: '10px'}}
                />
                <TextField
                    type="text"
                    variant="outlined"
                    label="Description"
                    name="description"
                    placeholder="Description"
                    fullWidth
                    value={description}
                    onChange={e => {
                    setDescription(e.target.value);
                    }}
                    required
                    style={{marginTop: '10px'}}
                />
                <div className="previewProfilePic" style={{marginTop:20}}>
                  <img className="playerProfilePic_home_tile" src={imgData} style={{width: 500, height: 300}}/>
                </div>
                <TextField
                    id="file"
                    type="file"
                    variant="outlined"
                    onChange={onChangePicture}
                    fullWidth
                    required
                    style={{marginTop: '10px'}}
                />
                
                 <Button
                    variant="contained"
                    style={{marginTop: '10px', backgroundColor: '#009600', color: 'white'}}
                    onClick={saveStore}
                 >
                    Save Store
                </Button>
                </div>
                </Grid>
                </FormControl>

            </Grid>

            </div>
            <div style={{padding: 13}}>
                <h2>Add Store Item</h2>
            <FormControl variant="outlined" >
                <Grid item xs={6}>
                <div  style={{width: 500}}>
                <TextField
                    type="text"
                    variant="outlined"
                    label="Item Name"
                    name="itemname"
                    placeholder="Item name"
                    value={item_name}
                    onChange={e => {
                    setItemname(e.target.value);
                    }}
                    fullWidth
                />

                <TextField
                    type="number"
                    variant="outlined"
                    label="Qty"
                    name="qty"
                    placeholder="Qty"
                    value={qty}
                    onChange={e => {
                    setQty(e.target.value);
                    }}
                    fullWidth
                    style={{marginTop: '10px'}}
                />
                <TextField
                    type="number"
                    variant="outlined"
                    label="Price"
                    name="price"
                    placeholder="price"
                    value={price}
                    onChange={e => {
                    setPrice(e.target.value);
                    }}
                    fullWidth
                    style={{marginTop: '10px'}}
                />

                <TextField
                    type="text"
                    variant="outlined"
                    label="Coupon"
                    name="coupon"
                    placeholder="Coupons"
                    // value={price}
                    // onChange={e => {
                    // setPrice(e.target.value);
                    // }}
                    fullWidth
                    style={{marginTop: '10px'}}
                />

                <TextField
                    type="number"
                    variant="outlined"
                    label="Promotions"
                    name="discounted"
                    placeholder="Promotions"
                    // value={price}
                    // onChange={e => {
                    // setPrice(e.target.value);
                    // }}
                    fullWidth
                    style={{marginTop: '10px'}}
                />

                <div className="previewProfilePic"  style={{marginTop:20}}>
                  <img className="playerProfilePic_home_tile" src={imgData2} style={{width: 500, height: 300}}/>
                </div>
                <TextField
                    id="file"
                    type="file"
                    variant="outlined"
                    
                    onChange={onChangePicture2}
                    fullWidth
                    required
                    style={{marginTop: '10px'}}
                />


                <TextField
                    type="text"
                    variant="outlined"
                    label="Description"
                    name="desc"
                    placeholder="Description"
                    value={desc}
                    onChange={e => {
                    setDescriptions(e.target.value);
                    }}
                    fullWidth
                    style={{marginTop: '10px'}}
                />
                 <Button
                    variant="contained"
                    style={{marginTop: '10px', backgroundColor: '#0a1e82', color: 'white'}}
                    onClick={saveItem}
                 >
                    Save Item
                </Button>
                </div>
                </Grid>
                </FormControl>
            </div>

            <div style={{ padding: 13}}>
            <Grid container>
                {/* <Additems/> */}

                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table" >
                <TableHead >
                <TableRow>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Store Name</StyledTableCell>
                    <StyledTableCell style={{color: 'white', textAlign:'center'}}>Description</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Address</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Store Tag</StyledTableCell>
                    <StyledTableCell style={{color:'white', textAlign: 'center'}}>Ratings</StyledTableCell>
                    <StyledTableCell style={{color:'white'}}>Action</StyledTableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.keys(store).map(id=>{

                            return <tr key={id}>
                                <StyledTableCell style={{textAlign: "center"}}>{store[id].storename}</StyledTableCell>
                                <StyledTableCell style={{textAlign: "center"}}>{store[id].description}</StyledTableCell>
                                <StyledTableCell style={{textAlign: "center"}}>{store[id].address}</StyledTableCell>
                                <StyledTableCell style={{textAlign: "center"}}>{store[id].storetag}</StyledTableCell>
                                <StyledTableCell style={{textAlign: "center"}}>{store[id].ratings}</StyledTableCell>
                                <StyledTableCell>
                                <CloseIcon  style={{color: 'red'}}onClick={() => deleteDocId(store[id].id)}/>
                                </StyledTableCell>
                            </tr>
                        })

                    }
                </TableBody>
            </Table>
            </TableContainer>


            </Grid>
            </div>

            <div style={{ padding: 13}}>
            <Grid container>
                {/* <Additems/> */}

                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table" >
                <TableHead >
                <TableRow>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Item Name</StyledTableCell>
                    <StyledTableCell style={{color: 'white', textAlign:'center'}}>Quantity</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Price</StyledTableCell>
                    <StyledTableCell style={{color:'white',textAlign:'center'}}>Description</StyledTableCell>
                    <StyledTableCell style={{color:'white'}}>Action</StyledTableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.keys(item).map(id=>{

                            return <tr key={id}>
                                <StyledTableCell style={{textAlign: "center"}}>{item[id].item_name}</StyledTableCell>
                                <StyledTableCell style={{textAlign: "center"}}>{item[id].qty}</StyledTableCell>
                                <StyledTableCell style={{textAlign: "center"}}>{item[id].price}</StyledTableCell>
                                <StyledTableCell style={{textAlign: "center"}}>{item[id].desc}</StyledTableCell>
                                <StyledTableCell>
                                <CloseIcon  style={{color: 'red'}}onClick={() => deleteDocId2(item[id].id)}/>
                                </StyledTableCell>
                            </tr>
                        })

                    }
                </TableBody>
            </Table>
            </TableContainer>


            </Grid>
            </div>
        </body>
      </>
  )
}

export default Stores;
