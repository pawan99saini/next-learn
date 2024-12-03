'use client'
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Container,
  SimpleGrid,
  Box,
  Input,
  Button,
  Heading,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';


import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type LoginFormInputs = {
  email: string;
  password: string;
};


export default function Home() {
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
 
  const toast = useToast()

  const [error, setError] = useState(null)
  
  

  const onSubmit = async (values: LoginFormInputs) => 
    {
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if(response.ok)
        {

        }
        else
        {
          toast({
            title: data.error,
            description:data.error,
            status: "error",
            duration: 1500,
            isClosable: true,
            position: "top-right",

          })
  
        }
    
    } 
    catch (error) 
    {
      console.log(error);
    }
   }
  return (
    <Container>
    <SimpleGrid>
      <Box w={500} p={4} m="100px auto">
      <Heading as="h2" size="l" textAlign="center" m={5}>
    Login  
    </Heading>
    <form>
    <FormControl 
        isInvalid={!!errors?.email?.message}
        p='4'
        isRequired
>
      <FormLabel htmlFor='email'>Email</FormLabel>
      <Input
        id='email'
        placeholder='Email'
        {...register("email")}
      />
<FormErrorMessage>{errors?.email?.message}</FormErrorMessage> 
    </FormControl>
    <FormControl
            isInvalid={!!errors?.password?.message}
            px='4'
            pb='4'
            isRequired    
    >
      <FormLabel htmlFor='password'>Password</FormLabel>
      <Input
        id='password'
        placeholder='Password'
        type="password"
        {...register("password")}
      />
    <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
    </FormControl>
    <Button 
    onClick={handleSubmit(onSubmit)}
            p='4'
            mx='4'
            mt='6'
            w='90%'
            colorScheme='blue'
            variant='solid'    
           type='submit'
           disabled={!!errors.email || !!errors.password}
    >
      Submit
    </Button>
    {error}
  </form>
  </Box>
  </SimpleGrid>
  </Container>
  );
}
