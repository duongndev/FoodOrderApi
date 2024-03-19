const users = [
  {
    fullName: "admin",
    email: "admin@example.com",
    password: "admin123",
    isAdmin: true,
    phoneNumber: "1234567890",
    address: {
      street: "123 Main St",
      city: "New York",
      postalCode: "10001",
      country: "USA",
    },
    avatar: "https://i.ibb.co/4pDNTkv/avatar.png",
  },
  {
    fullName: "John Doe",
    email: "John@example.com",
    password: "password123",
    isAdmin: false,
    phoneNumber: "0132456789",
    address: {
      street: "123 Main St",
      city: "New York",
      postalCode: "10001",
      country: "USA",
    },
    avatar: "https://i.ibb.co/4pDNTkv/avatar.png",
  }
];

const categories = [
  {
    name: "Category 1",
    image: "https://i.ibb.co/4pDNTkv/avatar.png",
  },
  {
    name: "Category 2",
    image: "https://i.ibb.co/4pDNTkv/avatar.png",
  },
  {
    name: "Category 3",
    image: "https://i.ibb.co/4pDNTkv/avatar.png",
  }
]



module.exports = users
