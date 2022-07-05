import logo from '../../assets/bookcover/logo-bw.jpg'
import "./logo.css";

function Header(){
    return(
        <>
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top px-5"><img src={logo} className="logo" alt="64x64"/>
            <a className="navbar-brand" href="#"><h4><b> BOOKWORM</b></h4></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item nav-justified">
                        <a className="nav-link" href="/home-page">Home <span className="sr-only"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/shop-page">Shop</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about-us">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/cart">Cart(0)</a>
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link" href="/login-user">Sign in</a> */}
                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#myModal"> Sign in
                        </button>
                    </li>

                </ul>
            </div>
            
        </nav>
        <div class="modal" id="myModal">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">Sign in</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                     <form >
                        <div className='form-group mb-3'>
                            <label>Email: </label>
                            <input type='text' className='email' placeholder='Email' name='email'/>
                        </div>
                        <div className='form-group mb-3'>
                            <label>Password: </label>
                            <input type='password' className='password' placeholder='Password' name='password'/>
                        </div>
                        <div className='form-group mb-3'>
                        <button type='submit' className='btn btn-primary'>Login</button> <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                    </div>
                    <div class="modal-footer">
                    
                    </div>
                </div>
                </div>
            </div>
        </>
      

       
    );
}

export default Header; 