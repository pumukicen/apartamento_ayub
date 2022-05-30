import { CONDICIONS_EN } from './condiciones/condiciones.en';
import { NORMAS_EN } from './normas/normas.en';

export const TRANSLATIONS_EN: { [key: string]: string } = {
  menu_inicio: 'Home',
  menu_apartamento: 'Apartment',
  menu_experiencias: 'Experiencies',
  menu_experiencias_restaurantes: 'Restaurants',
  menu_experiencias_lugares: 'Places',
  menu_experiencias_eventos: 'Events',
  menu_entorno: 'Environment',
  menu_informacion: 'Info',
  menu_informacion_servicios: 'Services',
  menu_informacion_normas: 'Rules',
  menu_informacion_condiciones: 'Conditions',
  menu_blog: 'Blog',
  menu_contacto: 'Contact',
  menu_reservar: 'Booking',

  auth_login: 'Login',
  auth_registro: 'Signup',
  auth_registrate: 'Signup',
  auth_nombre: 'Name',
  auth_apellidos: 'Surname',
  auth_email: 'Email',
  auth_password: 'Password',
  auth_phone: 'Phone',
  auth_repeat_password: 'Repeat Password',
  auth_no_cuenta: "Don't have an account?",
  auth_alert_password: 'We will never share your email with anyone else',

  toastr_error: 'ERROR',
  toastr_login_error: 'Wrong email or password',
  toastr_signup_succes: 'you have successfully registered',
  toastr_signup_error: 'This email is already registered',
  toastr_update_succes: 'Your personal information has been updated',
  toastr_update_error: 'There is no registered user',
  toastr_avatar_succes: 'Your profile picture has been updated',
  toastr_avatar_error: 'Failed to update your profile picture',
  toastr_feedback_succes: 'Your comment has been recorded',
  toastr_feedback_error: 'Your comment has not been recorded',
  toastr_book_succes: 'Your booking request has been created',
  toastr_book_error: 'No ha sido posible crear tu reserva',
  toastr_book_overlap: 'It was not possible to create your reservation',

  btn_entrar: 'Login',
  btn_reservar: 'Book',
  btn_login: 'Login',
  btn_signup: 'Signup',
  btn_registrar: 'Register',
  btn_modificar: 'Modify',
  btn_enviar: 'Send',

  client_data: 'My data',
  client_books: 'My books',
  client_feedback: 'Feedback',
  client_logout: 'Logout',
  client_personal_data: 'My personal data',
  client_feedback_msg_1: 'Your opinion is very valuable to us.',
  client_feedback_msg_2: 'Send us your comment.',
  client_language: 'Language',
  client_language_es: 'Espanish',
  client_language_en: 'Wnglish',

  book_since: 'Arrival',
  book_until: 'Leave',
  book_since_date: 'Arrival date',
  book_until_date: 'Leave date',
  book_adults: 'Adults',
  book_children: 'Children',
  book_observations: 'Observations',
  book_processing: 'In process',
  book_acepted: 'Aproved',
  book_denied: 'Rejected',
  book_current: 'Current',
  book_no_books: 'you have no books',

  footer_text_1:
    'The warmth and comfort of our apartment<br/>will make your stay more than just a stay,<br/>you will feel as good as in your own home.',
  footer_follow_us: 'Follow us',

  location: 'Location',

  normas: NORMAS_EN,
  condiciones: CONDICIONS_EN,

  servicios_text_1:
    'We strive to offer all the comforts in our apartment, because we want you to feel at home to enjoy all that our territory has to offer soaking in its history, culture and nature.',
  servicios_wifi_title: 'Wifi',
  servicios_wifi_text:
    'You will be able to enjoy WiFi connection in our apartment, it is free for all our clients.',
  servicios_cocina_title: 'Kitchen',
  servicios_cocina_text:
    'Fully equipped with everything you need. It has: cookware, crockery, coffee maker, kitchen utensils, dishwasher, microwave, oven and cleaning material.',
  servicios_bano_title: 'Bathroom',
  servicios_bano_text:
    'Fully equipped with everything you need. Among other things: towels, soap, shampoo and shower gel and hair dryer.',
  servicios_calef_title: 'Heating',
  servicios_calef_text:
    'Our apartment has heating so that you can enjoy a pleasant stay in winter days.',
  servicios_bebe_title: 'Babies',
  servicios_bebe_text:
    'We have cribs, high chairs and games at your disposal. No extra cost if you inform us when you make your reservation.',
  servicios_parkin_title: 'Parking',
  servicios_parkin_text:
    'The parking lot in the historic center is payable except on weekends and holidays, but free parking is available 100 meters away.',
};
