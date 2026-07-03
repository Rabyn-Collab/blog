import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { UserIcon, LogOutIcon, NotebookText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUser } from '@/features/auth/authSlice'

const listItems = [
  {
    icon: (
      <UserIcon />
    ),
    property: 'Profile'
  },
  {
    icon: (
      <NotebookText />
    ),
    property: 'My Blogs'
  },
  {
    icon: (
      <LogOutIcon />
    ),
    property: 'Sign Out'
  }
]

const DropdownMenuUser = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <Avatar>
            <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
            <AvatarFallback className='text-xs'>HR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          {listItems.map((item, index) => (
            <DropdownMenuItem
              onClick={() => {
                switch (index) {
                  case 0:
                    // TODO: Navigate to profile
                    break;
                  case 1:
                    nav('/user-blog-list');
                    break;
                  case 2:
                    dispatch(removeUser());
                    break;
                }
              }}

              key={index} className='*:[svg]:text-muted-foreground'>
              {item.icon}
              <span className='text-popover-foreground'>{item.property}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownMenuUser
