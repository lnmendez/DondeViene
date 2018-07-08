<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

    public function __construct() {
        parent::__construct();
        
		$this->load->model('usuario');
		$this->load->model('chofer');
		$this->load->model('micros');
    }

	// CONTROLADOR PRINCIPAL //
    // validar index por sesiones //
	public function index()
	{
        if ($this->session->userdata("user")) {
			$this->load->view('header');
			$this->load->view('home');
			$this->load->view('footer');
        } else {
            $this->load->view('login'); 
        }
	}
	 
	// validar usuario //
    public function signin() {
        $mail = $this->input->post('mail');
        $pass = $this->input->post('pass');
        
        $arrayUser = $this->usuario->login($mail, md5($pass));
        if (count($arrayUser) > 0) {
            $this->session->set_userdata("user", $arrayUser);
            echo json_encode(array("msg" => "1"));
        } else {
            echo json_encode(array("msg" => "0"));
        }
	}

	// cerrar sesión //
	public function logout() {
		if ($this->session->userdata("user")) {
			$this->session->sess_destroy();
			redirect('');
		} else {
			$this->load->view('login'); 
		}	
	}

	// home del main //
	public function home() {
		if ($this->session->userdata("user")) {
			$this->load->view('home');
		} else {
			$this->load->view('login'); 
		}		
	}

	// CONTROLLER CHOFERES //

	// cargar modulo chofer //
	public function modulo_choferes() {
        if ($this->session->userdata("user")) {
			$this->load->view('mantenedores/choferes');
		} else {
			$this->load->view('login'); 
		}
	}

	// listar chofer //
    public function list_choferes() {
        if ($this->session->userdata("user")) {
        	echo json_encode($this->chofer->list_choferes());
		} else {
			$this->load->view('login'); 
		}
	}

	// agregar chofer //
	public function add_choferes() {
		if ($this->session->userdata("user")) {
			$rut = $this->input->post("rut");
			$nombres = $this->input->post("nombres");
			$apellidop = $this->input->post("apellidop");
			$apellidom = $this->input->post("apellidom");
			$celular = $this->input->post("celular");
			$correo = $this->input->post("correo");
			$id_empresa = 1; //$user[0]->id_empresa;
	
			if ($this->chofer->add_choferes($rut, $nombres, $apellidop, $apellidom, $celular, $correo, $id_empresa)) {
				echo json_encode(array("msg"=>"1"));
			} else {
				echo json_encode(array("msg"=>"2"));
			}
		} else {
			$this->load->view('login'); 
		}
	}

	// editar chofer //
	public function edit_choferes() {
		if ($this->session->userdata("user")) {
			$id_chofer = $this->input->post("id_chofer");
			$nombres = $this->input->post("nombres");
			$apellidop = $this->input->post("apellidop");
			$apellidom = $this->input->post("apellidom");
			$celular = $this->input->post("celular");
			$correo = $this->input->post("correo");
	
			if ($this->chofer->edit_choferes($id_chofer, $nombres, $apellidop, $apellidom, $celular, $correo)) {
				echo json_encode(array("msg"=>"1"));
			} else {
				echo json_encode(array("msg"=>"2"));
			}
		} else {
			$this->load->view('login'); 
		}
	}

	// eliminar chofer //
	public function delete_choferes() {
		if ($this->session->userdata("user")) {
			$id_chofer = $this->input->post("id_chofer");
			
			if ($this->chofer->delete_choferes($id_chofer)) {
				echo json_encode(array("msg"=>"1"));
			} else {
				echo json_encode(array("msg"=>"2"));
			}
		} else {
			$this->load->view('login'); 
		}
	}
		
	// CONTROLLER LINEAS //

	// cargar modulo lineas //
	public function modulo_micros() {
        if ($this->session->userdata("user")) {
			$this->load->view('mantenedores/micros');
		} else {
			$this->load->view('login'); 
		}
	}

	// listar lineas //
    public function list_micros() {
        if ($this->session->userdata("user")) {
        	echo json_encode($this->micros->list_micros());
		} else {
			$this->load->view('login'); 
		}
	}

	// agregar lineas //
	public function add_micros() {
		if ($this->session->userdata("user")) {
			$marca = $this->input->post("marca");
			$modelo = $this->input->post("modelo");
			$ano = $this->input->post("ano");
			$patente = $this->input->post("patente");
			$capacidad = $this->input->post("capacidad");
			$km = $this->input->post("km");
			$id_empresa = 1;
	
			if ($this->micros->add_micros($marca, $modelo, $ano, $patente, $capacidad, $km, $id_empresa)) {
				echo json_encode(array("msg"=>"1"));
			} else {
				echo json_encode(array("msg"=>"2"));
			}
		} else {
			$this->load->view('login'); 
		}
	}

	// editar lineas //
	public function edit_micros() {
		if ($this->session->userdata("user")) {
			$id_chofer = $this->input->post("id_micros");
			$marca = $this->input->post("marca");
			$modelo = $this->input->post("modelo");
			$ano = $this->input->post("ano");
			$patente = $this->input->post("patente");
			$capacidad = $this->input->post("capacidad");
			$km = $this->input->post("km");
	
			if ($this->micros->edit_micros($id_chofer, $marca, $modelo, $ano, $patente, $capacidad, $km)) {
				echo json_encode(array("msg"=>"1"));
			} else {
				echo json_encode(array("msg"=>"2"));
			}
		} else {
			$this->load->view('login'); 
		}
	}

	// eliminar lineas //
	public function delete_micros() {
		if ($this->session->userdata("user")) {
			$id_micro = $this->input->post("id_micro");
			
			if ($this->micros->delete_micros($id_micro)) {
				echo json_encode(array("msg"=>"1"));
			} else {
				echo json_encode(array("msg"=>"2"));
			}
		} else {
			$this->load->view('login'); 
		}
	}
		
	// CONTROLLER MICROS //

	// cargar modulo micros //
	public function modulo_micros() {
        if ($this->session->userdata("user")) {
			$this->load->view('mantenedores/micros');
		} else {
			$this->load->view('login'); 
		}
	}

	// listar micros //
    public function list_micros() {
        if ($this->session->userdata("user")) {
        	echo json_encode($this->micros->list_micros());
		} else {
			$this->load->view('login'); 
		}
	}

	// agregar micros //
	public function add_micros() {
		if ($this->session->userdata("user")) {
			$marca = $this->input->post("marca");
			$modelo = $this->input->post("modelo");
			$ano = $this->input->post("ano");
			$patente = $this->input->post("patente");
			$capacidad = $this->input->post("capacidad");
			$km = $this->input->post("km");
			$id_empresa = 1;
	
			if ($this->micros->add_micros($marca, $modelo, $ano, $patente, $capacidad, $km, $id_empresa)) {
				echo json_encode(array("msg"=>"1"));
			} else {
				echo json_encode(array("msg"=>"2"));
			}
		} else {
			$this->load->view('login'); 
		}
	}

	// editar micros //
	public function edit_micros() {
		if ($this->session->userdata("user")) {
			$id_chofer = $this->input->post("id_micros");
			$marca = $this->input->post("marca");
			$modelo = $this->input->post("modelo");
			$ano = $this->input->post("ano");
			$patente = $this->input->post("patente");
			$capacidad = $this->input->post("capacidad");
			$km = $this->input->post("km");
	
			if ($this->micros->edit_micros($id_chofer, $marca, $modelo, $ano, $patente, $capacidad, $km)) {
				echo json_encode(array("msg"=>"1"));
			} else {
				echo json_encode(array("msg"=>"2"));
			}
		} else {
			$this->load->view('login'); 
		}
	}

	// eliminar micros //
	public function delete_micros() {
		if ($this->session->userdata("user")) {
			$id_micro = $this->input->post("id_micro");
			
			if ($this->micros->delete_micros($id_micro)) {
				echo json_encode(array("msg"=>"1"));
			} else {
				echo json_encode(array("msg"=>"2"));
			}
		} else {
			$this->load->view('login'); 
		}
	}

}
