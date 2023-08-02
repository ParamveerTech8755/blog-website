const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const lodash = require('lodash')

const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

const homeStartingContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut tellus elementum sagittis vitae et. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Vitae congue mauris rhoncus aenean vel. Vel risus commodo viverra maecenas accumsan lacus. Aliquam sem et tortor consequat id porta nibh. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Sed libero enim sed faucibus turpis. Nibh venenatis cras sed felis eget velit. Aliquam etiam erat velit scelerisque in dictum non consectetur. Diam quis enim lobortis scelerisque fermentum dui. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Nunc faucibus a pellentesque sit amet porttitor eget dolor.
Libero nunc consequat interdum varius. Nec feugiat nisl pretium fusce. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus a. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Condimentum lacinia quis vel eros donec ac. Augue lacus viverra vitae congue eu consequat ac felis. Amet consectetur adipiscing elit ut aliquam purus sit. Et netus et malesuada fames ac turpis. Ante in nibh mauris cursus mattis molestie a iaculis at. Turpis massa tincidunt dui ut ornare lectus. Iaculis eu non diam phasellus vestibulum lorem sed. Mus mauris vitae ultricies leo integer malesuada nunc vel risus.
Fusce id velit ut tortor pretium. `

const aboutContent = "Some dummy text"
const contactContent = "Some dummy text"
const postArr = []

app.get('/', (req, res) => {
	res.render('home.ejs', {
		content: homeStartingContent,
		array: postArr
	})
})
app.get('/about', (req, res) => {
	res.render('about.ejs', {
		content: aboutContent
	})
})
app.get('/contact', (req, res) => {
	res.render('contact.ejs', {
		content: contactContent
	})
})

app.get('/compose', (req, res) => {
	res.render('compose.ejs')
})
app.post('/compose', (req, res) => {
	const result = req.body
	postArr.push(result)
	res.redirect('/')
})

app.get('/posts/:title', async (req, res) => {
	// console.log(req.params.title)
	// res.status(200).send('Good Job')
	const title = req.params.title
	for(let i = 0; i < postArr.length; i++){
		if(lodash.kebabCase(postArr[i].title) === lodash.kebabCase(title)){
			await res.render('post.ejs', {
				title: postArr[i].title,
				post: postArr[i].post
			})
			break
		}
	}
})

app.all('*', (req, res) => {
	res.render('notfound.ejs')
})
app.listen(PORT, err => {
	if(err)
		console.log(`Error: ${err}`)
	else{
		console.log(`Server running on port ${PORT}!`)
	}
})