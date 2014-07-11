module Percoms
	def fact(n)
		if n<= 1
			1
  		else
    		n * fact( n - 1 )
  		end
	end
	def perm(n,r)
		fact(n) / fact(n-r)
	end
end