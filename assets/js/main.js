const urlUsers = 'https://reqres.in/api/users?page=2';

/*---------------------- html ---------------------*/

const $template = document.querySelector('template').content;
const $fragment = document.createDocumentFragment();
const $usersContainer = document.querySelector('.userscontainer');
// console.log($template);
// $fragment.appendChild($template)
// console.log($fragment);

const getUsers = async () => {
	const reply = await fetch(urlUsers);

	// console.log(reply);
	//usamos la desestructuracion de argumentos para extraer lo que nos interesa que es el data del body.json() y lo renombramos como queremos
	const { data: users } = await reply.json();
	// console.log(users);
	return users;
};

getUsers();

const createHTML = async (users) => {
	const usersList = await users;
	console.log(usersList);
    let count = 0;
	usersList.forEach((user) => {
		const $cloneTemplate = document.importNode($template, true);
		$cloneTemplate.querySelector('.user__img').setAttribute('src', user.avatar);
        $cloneTemplate.querySelector('.user__position').innerHTML= count+=1
        console.log(count);        
		$cloneTemplate.querySelector('.user__name').insertAdjacentText('afterbegin', user.first_name);
		$cloneTemplate.querySelector('.user__lastname').insertAdjacentText('afterbegin', user.last_name);
		$cloneTemplate.querySelector('.user__email').insertAdjacentText('afterbegin', user.email);
		// console.log($cloneTemplate);

		$usersContainer.appendChild($cloneTemplate);
	});
};

const init = async (users) => {
	//  console.log( await users);
	createHTML(users);
};

init(getUsers());
