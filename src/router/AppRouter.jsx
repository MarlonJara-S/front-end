import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginForm } from '../components/auth/components/LoginForm'
import { RegisterForm } from '../components/auth/components/RegisterForm'
import { ListUsers } from '../components/auth/pages/ListUsers'
import { EditUsers } from '../components/auth/pages/EditUsers'
import { useAuthStore } from '../hooks/useAuthStore'
import { use } from 'react'
import { Layout } from '../ui/Layout'
import SearchComponent from '../components/scrapper/components/SearchComponent'
import WishlistComponent from '../components/scrapper/components/WishListComponent'

export const AppRouter = () => {

    const { status,  checkoutToken } = useAuthStore();

    useEffect(() => {
        checkoutToken()
    }, [])

    if (status === 'checking') {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="loading-spinner"></div>
            </div>
        )
    }


  return (
            <Routes>
            {
                (status === 'not-authenticated')
                ? (
                    <>
                        <Route path="/auth/*" element={<LoginForm />} />
                        <Route path="/*" element={<Navigate to='/auth/login' />} />
                    </>
                )
                : (
                    <Route path="/" element={<Layout />}>
                        <Route index element={<SearchComponent />} />
                        <Route path="users" element={<ListUsers />} />
                        <Route path="users/:id" element={<EditUsers />} />
                        <Route path="search" element={<SearchComponent />} />
                        <Route path="wishlist" element={<WishlistComponent />} />
                        <Route path="*" element={<Navigate to='/' />} />
                    </Route>
                )
            }

            <Route path="/auth/register" element={<RegisterForm />} />
        </Routes>
  )
}
