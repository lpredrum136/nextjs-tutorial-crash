import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Layout from '../../components/Layout'
import { getPostIds, getPostById } from '../../lib/post'
import { useRouter } from 'next/router'
import Spinner from 'react-bootstrap/Spinner'
import spinnerStyles from '../../styles/Spinner.module.css'

const Post = ({ post }) => {
	const router = useRouter()

	// Neu trang chua tao ra, isFallback cua router === true
	// Va trang tam thoi sau day se duoc render

	if (router.isFallback) {
		return (
			<Spinner
				animation='border'
				role='status'
				variant='dark'
				className={spinnerStyles.spinnerLg}
			>
				<span className='sr-only'>LOADING ....</span>
			</Spinner>
		)
	}

	// Khi getStaticProps() chay xong lan dau tien.
	// Cac lan sau thi trang so 6 (vi du) se duoc dua vao danh sach prerendered
	return (
		<Layout>
			<Card className='my-3 shadow'>
				<Card.Body>
					<Card.Title>{post.title}</Card.Title>
					<Card.Text>{post.body}</Card.Text>
					<Link href='/posts'>
						<Button variant='dark'>Back</Button>
					</Link>
				</Card.Body>
			</Card>
		</Layout>
	)
}

// Lay du lieu kieu tinh, nhung du lieu tinh nao thi con phu thuoc vao path params
export const getStaticPaths = async () => {
	const paths = await getPostIds(5)
	console.log(paths)

	return {
		paths,
		// fallback: false // bat ki path nao k returned boi getStaticPaths se toi trang 404
		fallback: true // path nao k returned ngay lap tuc se show trang "tam thoi" => doi getStaticProps chay
		// => getStaticProps chay xong => return trang hoan chinh
	}
}

export const getStaticProps = async ({ params }) => {
	const post = await getPostById(params.id)

	return {
		props: {
			post
		},
		revalidate: 1
	}
}

export default Post
