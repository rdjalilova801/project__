import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { FiUser } from "react-icons/fi";
import { FcSearch } from "react-icons/fc";
import { BiDotsVertical } from "react-icons/bi";
import { BiLock } from "react-icons/bi";
import { BiLockOpen } from "react-icons/bi";
import { BiShieldX } from "react-icons/bi";
import { BiSupport } from "react-icons/bi";
import { BiUserCheck } from "react-icons/bi";
import { IoMdDownload } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { BsFillBellFill } from "react-icons/bs";
import { BsNewspaper } from "react-icons/bs";
import { GiPentagramRose } from "react-icons/gi";

const Table = () => {

    const [mas, setMass] = useState([])
    const [mas1, setMass1] = useState([])
    const [ID, setId] = useState("")
    const [user, setUser] = useState("")
    const [telephone, setTel] = useState("")
    const [jshsh, setJshsh] = useState("")
    const [device, setDevice] = useState("")
    const [editIndex, setIndex] = useState(null)    

    useEffect(() => {
        getData()
    }, []);

    function getData() {
        axios("https://api.npoint.io/6fb6a96022b1fd7c6e13")
            .then((ress) => {
                setMass(ress.data)
                setMass1(ress.data)
                console.log(ress.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function getVal(val) {
        let qiymat = mas1.filter(item => {
            return item.user.toLowerCase().includes(val.toLowerCase())
        })
        setMass(qiymat)
    }
    function getValID(val) {
        let qiymat = mas1.filter(item => {
            return item.id.toLowerCase().includes(val.toLowerCase())
        })
        setMass(qiymat)
    }
    function Add() {
        let obj = {
            id: ID,
            user: user,
            tel: telephone,
            jsh: jshsh,
            qurilma: device
        }

        let yangi = [...mas]
        yangi.push(obj)
        setMass(yangi)
        clearInput()
    }
    function clearInput() {
        setId('')
        setUser('')
        setTel('')
        setJshsh('')
        setDevice('')
    }

    function card(index) {
        let mas = [...mas1];
        mas[index].status = !mas[index].status;
        setMass(mas);
    }
    function del(params) {
        let Ochrish = [...mas1];
        Ochrish.splice(params, 1);
        setMass([...Ochrish]);
    }
    function blok(props) {
        let blac = [...mas1];
        blac[props].color = "bg-danger";
        setMass(blac);
    }
    function Chiq(props) {
        let blac = [...mas1];
        blac[props].color = "white";
        setMass(blac);
    }

    function edit(son, item) {
        setId(item.id)
        setIndex(son)
        setUser(item.user)
        setIndex(son)
        setTel(item.tel)
        setIndex(son)
        setJshsh(item.jsh)
        setIndex(son)
        setDevice(item.qurilma)
        setIndex(son)
    }
    function Edit() {
        let currentData = [...mas]
        currentData.splice(editIndex, 1, {
            id: ID,
            user: user,
            tel: telephone,
            jsh: jshsh,
            qurilma: device
        })
        setMass(currentData)
        clearInput()
    }

    return (
        <div>
            <div className="d-flex ">
                <div class="card1  text-light" >
                    <div className="container">
                        <h5 className=" ps-4 py-2 fw-bold"><IoMdDownload /> Statistika</h5>
                        <h5 className=" ps-4 py-2 fw-bold"><GiPentagramRose /> Amallar</h5>
                        <span className="ps-5">Push jo`natish</span>
                        <h5 className=" foy py-2  bg-light text-primary py-3 my-2">Foydalanuvchi siyosati</h5>
                        <h5 className=" ps-4 py-2 fw-bold"><BiUserCheck /> Ruxsatlar</h5>
                        <h5 className=" ps-4 py-2 fw-bold"><BsNewspaper /> Hisobotlar</h5>
                        <h4 className=" ps-4 py-2 fw-bold"> <BiSupport /> Call Markaz</h4>
                    </div>
                </div>
                <div className='ms-5 tb'>
                    <div className="d-flex align-items-center">
                        <input type="text" placeholder='Search' className='inp text-primary fw-bold fs-5 my-4 form control p-2 ps-5 ms-5' onInput={(val) => getVal(val.target.value)} />
                        <h3><FcSearch /></h3>
                        <h3 className='text-primary px-3'><BsFillBellFill /></h3>
                        <h3 className='text-dark'><FiUser /></h3>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h4>ID Orqali qidirish</h4>
                            <input type="number" onInput={(val) => getValID(val.target.value)} className='inp1 fw-bold fs-5' placeholder='ID_Search' />
                        </div>
                        <div>
                            <button type="button" className='btn1 btn btn-primary fw-bold px-4 text-light' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add_User</button>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">User</th>
                                <th scope="col">Telefon</th>
                                <th scope="col">JShShIR</th>
                                <th scope="col">Qurilma </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (mas) ? mas.map((item, index) => {
                                    return (
                                        <tr className='{${item.color}}'>
                                            <td scope="row">{item.id}</td>
                                            <td>{item.user}</td>
                                            <td>{item.tel}</td>
                                            <td>{item.jsh}</td>
                                            <td>{item.qurilma}</td>
                                            <td><button className='btn btn-white' onClick={() => card(index)}><BiDotsVertical /></button>
                                                <div className={`${item.status ? "d-none" : "d-block"} card`}>
                                                    <button onClick={() => {blok(index); }} className='blok btn btn-white text-danger'><BiLock /> Bloklash</button>
                                                    <button  onClick={() => { Chiq(index); }} className="btn btn-white text-success"><BiLockOpen /> Blokdan chiqarish</button>
                                                    <button   onClick={() => {del(index); }} className='btn btn-white text-danger '><BiShieldX /> Sessiyani tugatish</button>
                                                    <button  onClick={() => {edit(index, item); }} className='btn btn-white text-primary edit'><FaRegEdit /> Taxrirlash</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                    :
                                    alert("bunday massiv yo`q")
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Modal */}

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-info">
                            <h1 class="modal-title fs-3 fw-bold text-primary" id="staticBackdropLabel">React Exam😁</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="number" value={ID} onInput={(val) => setId(val.target.value)} placeholder='Add_ID' className='form-control fw-bold fs-5 my-2 text-primary' />
                            <input type="text" value={user} onInput={(val) => setUser(val.target.value)} placeholder='Add_User' className='form-control fw-bold fs-5 my-2 text-primary' />
                            <input type="number" value={telephone} onInput={(val) => setTel(val.target.value)} placeholder='Add_Telephone' className='form-control fw-bold fs-5 my-2 text-primary' />
                            <input type="number" value={jshsh} onInput={(val) => setJshsh(val.target.value)} placeholder='JShShIR' className='form-control fw-bold fs-5 my-2 text-primary' />
                            <input type="text" value={device} onInput={(val) => setDevice(val.target.value)} placeholder='Add_Device' className='form-control fw-bold fs-5 my-2 text-primary' />
                        </div>
                        <div class="modal-footer bg-info">
                        <button type="button" class="btn btn-primary fw-bold fs-5 form-control" onClick={Add} data-bs-dismiss="modal">+Add</button>
                         <button type="button" class="btn btn-warning fw-bold fs-5 form-control" onClick={Edit} data-bs-dismiss="modal">Edit_User</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
