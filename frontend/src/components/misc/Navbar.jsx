import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useMantineColorScheme, ActionIcon, Burger, Container, Group } from '@mantine/core';
import { useColorScheme, useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import useBoundStore from "../../store/Store";

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const { logoutService, user } = useBoundStore((state) => state);

  const onLogout = () => {
    logoutService();
  };

  const { setColorScheme, clearColorScheme } = useMantineColorScheme();
  let storedColorScheme = localStorage.getItem('mantine-color-scheme-value');
  let colorScheme = (storedColorScheme) ? storedColorScheme : useColorScheme();

  const toggleColorScheme = () => {
    colorScheme = (colorScheme === 'dark') ? 'light' : 'dark';
    setColorScheme(colorScheme);
  }

  const ucfirst = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <NavLink to="/">
          <div className={classes.logo}>COMP 3013</div>
        </NavLink>
        <Group gap={5} visibleFrom="xs">
          {!!user && (
            <NavLink className={classes.link} to="posts" end>
              {" "}
              Posts
            </NavLink>
          )}
          {!!user && (
            <NavLink className={classes.link} to="posts/create">
              {" "}
              Create
            </NavLink>
          )}
          {!!user ? (
            <div className={classes.link + " logout"} onClick={onLogout}>
              Log Out
            </div>
          ) : (
            <NavLink className={classes.link} to="login">
              Log In
            </NavLink>
          )}
          <ActionIcon size="lg" variant="default" className={classes.theme} onClick={toggleColorScheme} aria-label={ucfirst(colorScheme + ' mode')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
              <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
            </svg>
          </ActionIcon>
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
};

export default Navbar;
