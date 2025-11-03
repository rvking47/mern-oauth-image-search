import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaRegImages } from 'react-icons/fa6';

const Navigation = ({ name, avatar }) => {
    return (
        <>
            <Navbar className="fixed-top bg-body-tertiary shadow-sm font-sans ">
                <Container>
                    <Navbar.Brand href="/" className="flex items-center gap-2">
                        <FaRegImages className="text-blue-500 text-2xl" />
                        <span className="font-semibold text-lg text-blue-600 ml-2 font-sans text-center block sm:text-left sm:inline">
                            Image Search App
                        </span>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="d-flex align-items-center gap-2">
                            <img
                                src={avatar || "/default-avatar.png"}
                                width={40}
                                height={40}
                                alt="avatar"
                                className="rounded-circle"
                            />
                            <span className='font-medium font-sans'>Hi, {name || "Guest"}</span>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation