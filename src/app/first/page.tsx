import Nav from '../components/Nav'

export default function First() {
  // wanna see if this gets dehydrated in the DOM
  // yeah but only cos component is rendered on server
  // and then that component tree is cached
  // so "id_123" is present in text, and in script tag
  // but "testprop" is not
  const data = {
    testprop: 'id_123',
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Nav />
      <h1 className="mt-5">first {data.testprop}</h1>
    </main>
  )
}
